import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationDTO } from '../../model/accommodation-dto.model';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';
import { AccommodationSearchDTO } from '../../model/AccommodationSearchDTO';
import { welcomeAccommodationDTO } from '../../model/welcomeAccommodationDTO';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  selected = 1;
  location = "";
  startDate : string = "";
  endDate : string = "";
  public dataSource = new MatTableDataSource<welcomeAccommodationDTO>();
  public displayedColumns = ['name', 'location', 'perks', 'minGuests','maxGuests', 'totalPrice', 'pricePerGuest', 'priceOfAccommodation'];
  public accommodations: welcomeAccommodationDTO[] = [];
  public search: AccommodationSearchDTO = new AccommodationSearchDTO();

  constructor(private router: Router, private accommodationService: AccommodationService) { }

  ngOnInit() {
    this.selected = 1;
  }

  searchAccomodations(){
    this.search.startDate = this.startDate;
    this.search.endDate = this.endDate;
    this.search.location = this.location;
    this.search.numberOfGuests = this.selected;
    console.log(this.search)
    this.accommodationService.searchAccommodations(this.search).subscribe(res =>{
      console.log(res)
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
