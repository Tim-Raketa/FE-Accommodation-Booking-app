import { Component, OnInit } from '@angular/core';
import { PendingReservations } from '../../model/pendingReservations';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-host-reservations',
  templateUrl: './host-reservations.component.html',
  styleUrls: ['./host-reservations.component.css']
})
export class HostReservationsComponent implements OnInit {

  public dataSource = new MatTableDataSource<PendingReservations>();
  public displayedColumns = ['username', 'cancelCount', 'numberOfGuests', 'startDate','endDate'];
  public pendings: PendingReservations[] = [];
  accommodationId: any
  
  constructor(private router: Router, private route: ActivatedRoute , private accommodationService: AccommodationService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.accommodationId = params['id']
      this.accommodationService.getAcceptedReservations(this.accommodationId).subscribe(res =>{
        this.pendings = res;
        this.dataSource.data = res;
      })
    })
  }

  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };
  
  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  home =  () => {
    this.router.navigateByUrl('/host');
  };

  logout() {
    this.authService.logout();
  }

}
