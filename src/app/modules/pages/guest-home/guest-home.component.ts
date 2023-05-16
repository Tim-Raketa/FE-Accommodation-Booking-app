import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ReservationIdsDTO } from '../../model/reservationIdsDTO';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.css']
})
export class GuestHomeComponent implements OnInit {

  public dataSource = new MatTableDataSource<ReservationIdsDTO>();
  public displayedColumns = ['accommodationId', 'numOfGuests', 'startTime','endTime', "delete"];
  public reservations: ReservationIdsDTO[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  logout() {
    this.authService.logout();
  }  

  cancelReservation(id: number){
     alert("Trenutno nista ne radi.")
  }
}
