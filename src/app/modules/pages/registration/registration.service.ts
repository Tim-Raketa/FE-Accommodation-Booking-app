import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerUserDTO } from '../../model/registerUserDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  route: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  
  submit(registeringUser: registerUserDTO): Observable<Boolean> {
    return this.http.post<Boolean>(this.route + 'users/register', registeringUser, {headers: this.headers});
  }
}
