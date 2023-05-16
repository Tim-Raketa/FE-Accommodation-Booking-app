import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccommodationDTO } from '../model/accommodation-dto.model';
import { Observable } from 'rxjs';
import { RentableIntervalDTO } from '../model/rentable-interval-dto.model';
import { ReservationIdsDTO } from '../model/reservationIdsDTO';
import { AccommodationSearchDTO } from '../model/AccommodationSearchDTO';
import { welcomeAccommodationDTO } from '../model/welcomeAccommodationDTO';
import { PendingReservations } from '../model/pendingReservations';

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

  getGuestReservations(username: string): Observable<ReservationIdsDTO[]>{
    return this.http.get<ReservationIdsDTO[]>(this.route + 'reservations/accept/username=' + username , {headers: this.headers});
  }

  getAccommodationsByHostId(hostId: string): Observable<AccommodationDTO[]>{
    return this.http.get<AccommodationDTO[]>(this.route + 'accommodations/host/' + hostId, {headers: this.headers});
  }

  searchAccommodations(search: AccommodationSearchDTO): Observable<welcomeAccommodationDTO[]>{
    return this.http.post<welcomeAccommodationDTO[]>(this.route + 'accommodations/search', search);
  }

  updateRentableInterval(rentableInterval: RentableIntervalDTO): Observable<RentableIntervalDTO>{
    return this.http.put<RentableIntervalDTO>(this.route + 'accommodations/updateRentableInterval', rentableInterval, {headers: this.headers});
  }

  getRentableIntervalById(id: number): Observable<RentableIntervalDTO>{
    return this.http.get<RentableIntervalDTO>(this.route + 'accommodations/getRentableInterval/' + id, {headers: this.headers});
  }

  guestCancelReservation(id: number): Observable<boolean>{
    return this.http.put<boolean>(this.route + 'reservations/cancel/' + id, {headers: this.headers});
  }

  getPendingReservations(id: number): Observable<PendingReservations[]>{
    return this.http.get<PendingReservations[]>(this.route + 'reservations/pending/accommodation=' + id, {headers: this.headers});
  }

  acceptPendingReservation(id: number): Observable<boolean>{
    return this.http.put<boolean>(this.route + 'reservations/accept/' + id, {headers: this.headers});
  }

  getAccommodationById(accomodationId: number): Observable<AccommodationDTO>{
    return this.http.get<AccommodationDTO>(this.route + 'accommodations/' + accomodationId, {headers: this.headers});
  }

  denyPendingReservation(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.route + 'reservations/deny/' + id, {headers: this.headers});
  }
  
}
