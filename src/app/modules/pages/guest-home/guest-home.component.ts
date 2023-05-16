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
  public displayedColumns = ['accommodationId', 'numOfGuests', 'startTime','endTime', "delete"];
  public reservations: ReservationIdsDTO[] = [];

  constructor(private router: Router, private authService: AuthService, private accommodationService: AccommodationService) { }

  ngOnInit() {
    let username = localStorage.getItem("token")??"";
    this.accommodationService.getGuestReservations(username).subscribe(res =>{
      this.reservations = res;
      this.dataSource.data = res;
    })
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  logout() {
    this.authService.logout();
  }  

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
