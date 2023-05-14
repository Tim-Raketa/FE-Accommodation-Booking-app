import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ReservationIdsDTO } from '../../model/reservationIdsDTO';
import { AccommodationService } from '../../services/accommodation.service';

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent implements OnInit {

  public dataSource = new MatTableDataSource<ReservationIdsDTO>();
  public displayedColumns = ['accommodationId', 'numOfGuests', 'startTime','endTime', "delete"];
  public reservations: ReservationIdsDTO[] = [];

  constructor(private router: Router, private authService: AuthService, private accommodationService: AccommodationService) { }

  ngOnInit(){
    let username = localStorage.getItem("token")??"";
    this.accommodationService.getGuestReservations(username).subscribe(res =>{
      this.reservations = res;
      this.dataSource.data = res;
    })
  }

  cancelReservation(id: number){
    this.router.navigateByUrl('/guest');
  
  }

  logout() {
    this.authService.logout();
  }
}
