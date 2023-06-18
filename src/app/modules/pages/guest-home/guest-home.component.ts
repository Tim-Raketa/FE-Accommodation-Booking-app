import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ReservationIdsDTO } from '../../model/reservationIdsDTO';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {NotificationService} from "../../services/notification.service";
import {NotificationDTO} from "../../model/NotificationDTO";

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.css']
})
export class GuestHomeComponent implements OnInit {

  public dataSource = new MatTableDataSource<ReservationIdsDTO>();
  public displayedColumns = ['name', 'location', 'numOfGuests',
    'startTime','endTime', "delete"];
  public reservations: ReservationIdsDTO[] = [];
  private stompClient: any;

  constructor(private router: Router, private notificationService: NotificationService, private authService: AuthService, private accommodationService: AccommodationService) { }

  ngOnInit() {
    let username = localStorage.getItem("token")??"";
    this.initializeWebSocketConnection(localStorage.getItem("token")??"")
    this.loadNotifications()
    this.accommodationService.getGuestReservations(username).subscribe(res =>{
      this.reservations = res;
      this.reservations.forEach(res=>
        this.accommodationService.getAccommodationById(res.accommodationId).subscribe(xyz => {
          res.accommodationLocation = xyz.location;
          res.accommodationName = xyz.name;}
        ))
        console.log(res)
      this.dataSource.data = res;
    })
  }
  initializeWebSocketConnection(email: string) {
    //povezujemo se na socket
    let ws = new SockJS('http://localhost:8081/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    //this.loadNotifications();

    //notifijujemo za promenu
    this.stompClient.connect({}, () => {
      that.stompClient.subscribe('/notify/' + email, (message: { body: string }) => {
        console.log(message.body);
        //pozivamo notifs
        this.loadNotifications();
      });
    });
  }
  loadNotifications() {
    console.log("RELOADING");
    let username=localStorage.getItem("token")??"";
    if (username!="") {
      this.notificationService.getNotifications(username).subscribe((resp: NotificationDTO[]) => {
       let result= resp.map(notif=> {
          if(!notif.opened) return notif
         else
           return ;
        })
        result.forEach(res => {
          if(res??"") {
            alert(res?.message);
            this.notificationService.openNotifications(<Number>res?.id).subscribe()
          }
        })
      });
    }

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

  cancelReservation(id: number){
     this.accommodationService.guestCancelReservation(id).subscribe(res =>{
      if(res === true){
        alert("Successfully canceled reservation.")
        this.ngOnInit();
      }else{
        alert("Cannot cancel this reservation.")
      }
     })
  }
}
