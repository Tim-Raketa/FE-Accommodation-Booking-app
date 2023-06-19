import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccommodationService} from "../../services/accommodation.service";
import {AuthService} from "../login/auth.service";
import {ReservationIdsDTO} from "../../model/reservationIdsDTO";
import {UserEditService} from "../user-edit/user-edit.service";
import {MatTableDataSource} from "@angular/material/table";
import {PendingReservations} from "../../model/pendingReservations";
import {FlightDTO} from "../../model/FlightDTO";

@Component({
  selector: 'app-guest-flight',
  templateUrl: './guest-flight.component.html',
  styleUrls: ['./guest-flight.component.css']
})
export class GuestFlightComponent {
  constructor(private router: Router, private route: ActivatedRoute,private accommodationService: AccommodationService, private authService : AuthService) { }

  public dataSource = new MatTableDataSource<FlightDTO>();
  public displayedColumns = ['date','destination', 'startingLocation', 'totalPrice'];

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



}
