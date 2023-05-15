import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationDTO } from '../../model/accommodation-dto.model';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

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

  goToLogin =  () => {
    this.router.navigateByUrl('/login');
  };

  goToRegistration =  () => {
    this.router.navigateByUrl('/registration');
  };

}
