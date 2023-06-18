import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationDTO} from "../model/NotificationDTO";



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  route: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
  getNotifications(email: string): Observable<NotificationDTO[]>{
    return this.http.get<NotificationDTO[]>(this.route + 'notifs/' + email, {headers: this.headers});
  }
  addNotifications(notification: NotificationDTO): Observable<NotificationDTO>{
    return this.http.post<NotificationDTO>(this.route + 'notifs/' , notification, {headers: this.headers});
  }
  openNotifications(id: Number): Observable<NotificationDTO>{
    return this.http.put<NotificationDTO>(this.route + 'notifs/' + id, {headers: this.headers});
  }
}
