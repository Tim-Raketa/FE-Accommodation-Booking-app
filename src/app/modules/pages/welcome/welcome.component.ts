import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationDTO } from '../../model/accommodation-dto.model';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';
import { AccommodationSearchDTO } from '../../model/AccommodationSearchDTO';
import { welcomeAccommodationDTO } from '../../model/welcomeAccommodationDTO';
import { CreateReservationDTO } from '../../model/createReservationDTO';
import { AuthService } from '../login/auth.service';
import {filterDTO} from "../../model/filterDTO";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatch } from '../../custom-validators/passwordMatch';
import {GraderService} from "../../services/grader.service";

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
  public filter: filterDTO=new filterDTO();
  public prominent:Boolean=false;

  public isCheckedProminent: any

  priceForm = new FormGroup({
    minPrice: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')]),
    maxPrice: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$')]),

  })

  get minPrice(){
    return this.priceForm.get('minPrice');
  }
  get maxPrice(){
    return this.priceForm.get('maxPrice');
  }

  constructor(private router: Router, private accommodationService: AccommodationService,private graderService:GraderService ,private authService: AuthService) { }

  ngOnInit() {
    this.selected = 1;
    this.userRole = localStorage.getItem("role")??'';
    this.isCheckedProminent = false;
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

    this.amenities = this.amenities.map((d)=>{
      if(d.id==id){
        d.select=isChecked;
        return d;
      }
      return d;
    })

  }

  checkValue(event: any){
    this.isCheckedProminent = event;
 }

  filterSearch() {
    var Amens:String="";
    for(var bonus of this.amenities){
      if(bonus.select)
      Amens+=bonus.name+","
    }
    Amens=Amens.substring(0,Amens.length-1);
    this.filter=new filterDTO(this.search);
    this.filter.amenities=Amens.toString();

    let minPrice = this.priceForm.get("minPrice")?.value
    let maxPrice = this.priceForm.get("maxPrice")?.value
    this.filter.minGrade = Number(minPrice);
    this.filter.maxGrade = Number(maxPrice);
    this.filter.onlyHighlighted = this.isCheckedProminent;


    //
    console.log(this.filter)

    this.accommodationService.filterAccommodation(this.filter).subscribe(res =>{
      this.accommodations = res;
      let potential:welcomeAccommodationDTO[]=[]
      let any:any;
      if(this.filter.onlyHighlighted){
        this.accommodations.filter(accommodation=>this.accommodationService.getAccommodationById(accommodation.accommodationId)
          .subscribe(res=>{
              any=res;
              this.graderService.getProminentStatus(res.hostId).subscribe(ret=>
              {if(ret)
                potential.push(any)
              })
        }))
        this.dataSource.data=potential
      } else
      this.dataSource.data = res;
    }
    );
  }
}
