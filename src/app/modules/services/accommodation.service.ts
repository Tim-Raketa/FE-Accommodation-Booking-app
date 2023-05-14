import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccommodationDTO } from '../model/accommodation-dto.model';
import { Observable } from 'rxjs';
import { RentableIntervalDTO } from '../model/rentable-interval-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  route: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAccommodations(): Observable<AccommodationDTO[]>{
    return this.http.get<AccommodationDTO[]>(this.route + 'accommodations/', {headers: this.headers});
  }

  createAccommodation(accommodation: AccommodationDTO): Observable<AccommodationDTO>{
    return this.http.post<AccommodationDTO>(this.route + 'accommodations/', accommodation, {headers: this.headers});
  }

  getRentableIntervalsByAccommodationId(accommodationId: number): Observable<RentableIntervalDTO[]>{
    return this.http.get<RentableIntervalDTO[]>(this.route + 'accommodations/rentableIntervals/accommodationId=' + accommodationId, {headers: this.headers});
  }

  createRentableInterval(rentableInterval: RentableIntervalDTO): Observable<RentableIntervalDTO>{
    return this.http.post<RentableIntervalDTO>(this.route + 'accommodations/createRentableInterval', rentableInterval, {headers: this.headers});
  }
  
}
