import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationDTO } from '../../model/accommodation-dto.model';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';
import { AccommodationSearchDTO } from '../../model/AccommodationSearchDTO';
import { welcomeAccommodationDTO } from '../../model/welcomeAccommodationDTO';
import { CreateReservationDTO } from '../../model/createReservationDTO';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userRole = '';
  selected = 1;
  location = "";
  startDate : string = "";
  endDate : string = "";
  amenities=[
    {id:1,select:false,name:"tv"},
    {id:2,select:false,name:"air-conditioning"},
    {id:3,select:false,name:"wi-fi"},
  ]
  public dataSource = new MatTableDataSource<welcomeAccommodationDTO>();
  public displayedColumns = ['name', 'location', 'perks', 'minGuests','maxGuests', 'totalPrice', 'pricePerGuest', 'priceOfAccommodation', 'book'];
  public accommodations: welcomeAccommodationDTO[] = [];
  public search: AccommodationSearchDTO = new AccommodationSearchDTO();
  public createReservationDTO: CreateReservationDTO = new CreateReservationDTO();

  constructor(private router: Router, private accommodationService: AccommodationService, private authService: AuthService) { }

  ngOnInit() {
    this.selected = 1;
    this.userRole = localStorage.getItem("role")??'';
  }

  searchAccomodations(){
    this.search.startDate = this.startDate;
    this.search.endDate = this.endDate;
    this.search.location = this.location;
    this.search.numberOfGuests = this.selected;

    this.accommodationService.searchAccommodations(this.search).subscribe(res =>{
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

  home =  () => {
    if(this.userRole == "GUEST"){
      this.router.navigateByUrl('/guest');
    } else {
      this.router.navigateByUrl('/host');
    }

  };

  logout() {
    this.authService.logout();
    window.location.reload()
  }

  bookReservation(accommmodationId: number){
    this.createReservationDTO.startDate = this.search.startDate;
    this.createReservationDTO.endDate = this.search.endDate;
    this.createReservationDTO.numberOfGuests = this.selected;
    this.createReservationDTO.accommodationId = accommmodationId;
    this.createReservationDTO.username = localStorage.getItem("token")??'';
    console.log(this.createReservationDTO)

    this.accommodationService.createReservation(this.createReservationDTO).subscribe(res =>{
      if(res.status == "RESERVATION_STATUS_PENDING"){
        alert("Reservation booking complete. Reservation pending for host approval. Check pending reservations.")
        this.router.navigateByUrl('/guest');
      } else {
        alert("Reservation booked. Check reservations.")
        this.router.navigateByUrl('/guest');
      }
     })
  };

  onChangeAmenities($event: Event) {
    // @ts-ignore
    const id=$event.target.value;
    // @ts-ignore
    const isChecked=$event.target.checked;
    console.log(id,isChecked)

    this.amenities = this.amenities.map((d)=>{
      if(d.id==id){
        d.select=isChecked;
        return d;
      }
      return d;
    })

    console.log(this.amenities)
  }
}
