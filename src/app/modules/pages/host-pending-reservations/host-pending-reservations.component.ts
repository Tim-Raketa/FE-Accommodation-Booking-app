import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { AuthService } from '../login/auth.service';
import { PendingReservations } from '../../model/pendingReservations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-host-pending-reservations',
  templateUrl: './host-pending-reservations.component.html',
  styleUrls: ['./host-pending-reservations.component.css']
})
export class HostPendingReservationsComponent implements OnInit {

  public dataSource = new MatTableDataSource<PendingReservations>();
  public displayedColumns = ['username', 'cancelCount', 'numberOfGuests', 'startDate','endDate', 'accept', 'deny'];
  public pendings: PendingReservations[] = [];
  accommodationId: any

  constructor(private router: Router, private route: ActivatedRoute , private accommodationService: AccommodationService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.accommodationId = params['id']
      this.accommodationService.getPendingReservations(this.accommodationId).subscribe(res =>{
        this.pendings = res;
        this.dataSource.data = res;
      })
    })
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  home =  () => {
    this.router.navigateByUrl('/host');
  };

  logout() {
    this.authService.logout();
  }

  accept(reservationId: number){
      this.accommodationService.acceptPendingReservation(reservationId).subscribe(res =>{
       if(res === true){
         alert("Successfully accepted reservation.")
         this.ngOnInit();
       }else{
         alert("Idk")
       }
      })
  };

}
