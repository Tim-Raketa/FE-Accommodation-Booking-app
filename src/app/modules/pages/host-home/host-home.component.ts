import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { AccommodationDTO } from '../../model/accommodation-dto.model';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';

@Component({
  selector: 'app-host-home',
  templateUrl: './host-home.component.html',
  styleUrls: ['./host-home.component.css']
})
export class HostHomeComponent implements OnInit {

  public dataSource = new MatTableDataSource<AccommodationDTO>();
  public displayedColumns = ['name', 'location', 'perks', 'minGuests','maxGuests', 'viewIntervals', 'accepted', 'pendings','grades'];
  public accommodations: AccommodationDTO[] = [];
  hostId: any

  constructor(private router: Router, private accommodationService: AccommodationService, private authService: AuthService) { }

  ngOnInit() {
    this.hostId = localStorage.getItem("token");

    this.accommodationService.getAccommodationsByHostId(this.hostId).subscribe(res =>{
      this.accommodations = res;
      this.dataSource.data = res;
    })
  }

  public addAccommodation() {
    this.router.navigate(['/host/createAccommodation']);
  }

  public viewIntervals(accommodationId: number){
    //this.router.navigate(['facilityAdmin', this.facilityAdminId, 'user', this.registeredUserId, 'appointment', appointment.id]);
    this.router.navigate(['host/accommodation', accommodationId]);
  }

  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  hostGrades(){
    this.router.navigate(['/host/grades']);
  }

  logout() {
    this.authService.logout();
  }

  pending(accommodationId: number){
    this.router.navigate(['pending/accommodation', accommodationId]);
  };

  accepted(accommodationId: number){
    this.router.navigate(['accepted/accommodation', accommodationId]);
  };

  grades(id:number) {
    this.router.navigate(['host/accommodation/grade',id])
  }
}
