import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public displayedColumns = ['name', 'location', 'perks', 'minGuests','maxGuests'];
  public accommodations: AccommodationDTO[] = [];


  constructor(private router: Router, private accommodationService: AccommodationService) { }

  ngOnInit() {
   this.accommodationService.getAccommodations().subscribe(res =>{
    this.accommodations = res;
    this.dataSource.data = res;
   })
  }

  public addAccommodation() {
    this.router.navigate(['/host/createAccommodation']);
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

}
