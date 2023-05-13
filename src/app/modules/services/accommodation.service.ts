import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccommodationDTO } from '../model/accommodation-dto.model';
import { Observable } from 'rxjs';

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
  
}
