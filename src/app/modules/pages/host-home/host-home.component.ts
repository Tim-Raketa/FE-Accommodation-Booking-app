import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { AccommodationDTO } from '../../model/accommodation-dto.model';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationService } from '../../services/accommodation.service';
import { GraderService } from '../../services/grader.service';
import {NotificationService} from "../../services/notification.service";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {NotificationDTO} from "../../model/NotificationDTO";

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
  prominentStatus: any
  private stompClient: any;


  constructor(private router: Router, private accommodationService: AccommodationService, private notificationService: NotificationService, private graderService: GraderService, private authService: AuthService) { }

  ngOnInit() {
    this.hostId = localStorage.getItem("token");

    this.initializeWebSocketConnection(localStorage.getItem("token")??"")
    this.loadNotifications()

    this.accommodationService.getAccommodationsByHostId(this.hostId).subscribe(res =>{
      this.accommodations = res;
      this.dataSource.data = res;
    })

    this.graderService.getProminentStatus(this.hostId).subscribe(res =>{
      this.prominentStatus = res;
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
