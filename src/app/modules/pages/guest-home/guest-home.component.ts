import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ReservationIdsDTO } from '../../model/reservationIdsDTO';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.css']
})
export class GuestHomeComponent implements OnInit {

  public dataSource = new MatTableDataSource<ReservationIdsDTO>();
  public displayedColumns = ['name', 'location', 'numOfGuests', 'startTime','endTime', "delete"];
  public reservations: ReservationIdsDTO[] = [];

  constructor(private router: Router, private authService: AuthService, private accommodationService: AccommodationService) { }

  ngOnInit() {
    let username = localStorage.getItem("token")??"";
    this.accommodationService.getGuestReservations(username).subscribe(res =>{
      this.reservations = res;
      this.reservations.forEach(res=> 
        this.accommodationService.getAccommodationById(res.accommodationId).subscribe(xyz => {
          res.accommodationLocation = xyz.location;
          res.accommodationName = xyz.name;} 
        ))
        console.log(res)
      this.dataSource.data = res;
    })
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  logout() {
    this.authService.logout();
  }  

  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };

  pendingReservations =  () => {
    this.router.navigateByUrl('/reservations');
  };

  cancelReservation(id: number){
     this.accommodationService.guestCancelReservation(id).subscribe(res =>{
      if(res === true){
        alert("Successfully canceled reservation.")
        this.ngOnInit();
      }else{
        alert("Cannot cancel this reservation.")
      }
     })
  }
}
