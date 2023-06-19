import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDTO} from "../model/accommodation-dto.model";
import {FlightSearchDTO} from "../model/FlightSearchDTO";
import {FlightDTO} from "../model/FlightDTO";
import {newTicketDTO} from "../model/NewTicketDTO";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  route: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
  searchFlights(search:FlightSearchDTO): Observable<FlightDTO[]>{
    return this.http.post<FlightDTO[]>(this.route + 'flights/search', search,{headers: this.headers});
  }
  exists(email:string): Observable<Boolean>{
    return this.http.get<Boolean>(this.route + 'flights/userExist/'+ email,{headers: this.headers});
  }
  newTicket(ticketDTO:newTicketDTO): Observable<Boolean>{
    return this.http.post<Boolean>(this.route + 'flights/buy/ticket', ticketDTO,{headers: this.headers});
  }

}
