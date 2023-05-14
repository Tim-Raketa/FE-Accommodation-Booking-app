import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { AuthService } from '../login/auth.service';
import { RentableIntervalDTO } from '../../model/rentable-interval-dto.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rentable-intervals-view',
  templateUrl: './rentable-intervals-view.component.html',
  styleUrls: ['./rentable-intervals-view.component.css']
})
export class RentableIntervalsViewComponent implements OnInit {

  public dataSource = new MatTableDataSource<RentableIntervalDTO>();
  public displayedColumns = ['startTime', 'endTime', 'priceOfAccommodation', 'pricePerGuest','automaticAcceptance'];
  public rentableIntervals: RentableIntervalDTO[] = [];
  accommodationId: any

  constructor(private router: Router, private route: ActivatedRoute, private accommodationService: AccommodationService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.accommodationId = params['id']
      this.accommodationService.getRentableIntervalsByAccommodationId(this.accommodationId).subscribe(res =>{
        this.rentableIntervals = res;
        this.dataSource.data = res;
       })
    });
  }

  public addInterval() {
    this.router.navigate(['host/accommodation', this.accommodationId, 'createRentableInterval']);
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  logout() {
    this.authService.logout();
  }

}
