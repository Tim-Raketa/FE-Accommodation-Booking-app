import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccommodationService} from "../../services/accommodation.service";
import {AuthService} from "../login/auth.service";
import {ReservationIdsDTO} from "../../model/reservationIdsDTO";
import {UserEditService} from "../user-edit/user-edit.service";
import {MatTableDataSource} from "@angular/material/table";
import {PendingReservations} from "../../model/pendingReservations";
import {FlightDTO} from "../../model/FlightDTO";
import {FlightsService} from "../../services/flights.service";
import {FlightSearchDTO} from "../../model/FlightSearchDTO";
import {newTicketDTO} from "../../model/NewTicketDTO";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-guest-flight',
  templateUrl: './guest-flight.component.html',
  styleUrls: ['./guest-flight.component.css']
})
export class GuestFlightComponent {
  constructor(private router: Router, private route: ActivatedRoute,private flightService:FlightsService,private accommodationService: AccommodationService, private authService : AuthService) { }

  public dataSource = new MatTableDataSource<FlightDTO>();
  public displayedColumns = ['dateTime','destination', 'startingLocation', 'totalPrice','ticket'];

  resservationId: any;
  resservation:ReservationIdsDTO=new ReservationIdsDTO();
  StartingLocation:string="";
  EndingLocation:string="";

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.resservationId = params['id']
      this.accommodationService.getById(this.resservationId).subscribe(res =>{
        this.resservation = res;
        this.accommodationService.getAccommodationById(this.resservation.accommodationId).subscribe(
          res=>{
            this.resservation.accommodationLocation=res.location;
            this.authService.getLoggedInUser().subscribe(
              user=>{this.resservation.username=user.email}
            );
          })
      })
      this.dataSource.data=[]
    })
  }



  FindForStarting() {
    let search = new FlightSearchDTO()
    search.startingLocation=this.StartingLocation;
    search.date=this.resservation.startDate;
    search.destination=this.resservation.accommodationLocation;
    search.numberOfPeople=this.resservation.numberOfGuests;
    this.flightService.searchFlights(search).subscribe(res=>
    this.dataSource.data=res);
  }
  FindForEnding() {
    let search = new FlightSearchDTO()
    search.startingLocation=this.resservation.accommodationLocation;
    search.date=this.resservation.endDate;
    search.destination=this.EndingLocation;
    search.numberOfPeople=this.resservation.numberOfGuests;
    this.flightService.searchFlights(search).subscribe(res=>
      this.dataSource.data=res);
  }
  buyTicket(id:number){
    this.flightService.exists(this.resservation.username).subscribe(res=>{
      if(!res) alert("you don't have an account on the flight website")
      else {
        let ticket=new newTicketDTO();
        ticket.flightId=id;
        ticket.email=this.resservation.username;
        ticket.numberOfPeople=this.resservation.numberOfGuests;
        this.flightService.newTicket(ticket).subscribe(res=>{
        if(res) alert("made a ticket")
          else alert("123")
        })
      }
    }
    )
  }
  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  logout() {
    this.authService.logout();
  }
  showGrades() {
    this.router.navigateByUrl('/guest/grades');
  }
  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };

  pendingReservations =  () => {
    this.router.navigateByUrl('/reservations');
  };
  visited(){
    this.router.navigateByUrl('/visited');
  };
}
