import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ReservationIdsDTO } from '../../model/reservationIdsDTO';
import { AccommodationService } from '../../services/accommodation.service';
import {visit} from "@angular/compiler-cli/src/ngtsc/util/src/visitor";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent implements OnInit {

  public dataSource = new MatTableDataSource<ReservationIdsDTO>();
  public displayedColumns = ['name', 'location', 'numOfGuests', 'startTime','endTime', "delete"];
  public reservations: ReservationIdsDTO[] = [];

  constructor(private router: Router, private authService: AuthService, private accommodationService: AccommodationService) { }

  ngOnInit(){
    let username = localStorage.getItem("token")??"";
    this.accommodationService.getGuestPendingReservations(username).subscribe(res =>{
      this.reservations = res;
      this.reservations.forEach(res=>
        this.accommodationService.getAccommodationById(res.accommodationId).subscribe(xyz => {
          res.accommodationLocation = xyz.location;
          res.accommodationName = xyz.name;}
        ))
      this.dataSource.data = res;
    })
  }

  deleteReservation(id: number){
    this.accommodationService.guestDeleteReservation(id).subscribe(res =>{
        alert("Successfully deleted reservation request.")
        this.ngOnInit();
     })

  }

  logout() {
    this.authService.logout();
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  home =  () => {
    this.router.navigateByUrl('/guest');
  };
  showGrades() {
    this.router.navigateByUrl('/guest/grades');
  }
  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };
  visited(){
    this.router.navigateByUrl('/visited');
  };
}
