import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../model/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiHost: string = 'http://localhost:8080';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

constructor(private http: HttpClient, private router: Router) { }

login(login:Login): Observable<any> {
  return this.http.post<Login>(this.apiHost + '/users/login', login);
}

/*getLoggedInUser():Observable<any>{
  return this.http.get<void>(this.apiHost + '/auth/loggedInUser', { headers: this.headers });
}*/

isAuthorized(allowedRoles: string[]): boolean {
  // check if the list of allowed roles is empty, if empty, authorize the user to access the page
  if (allowedRoles == null || allowedRoles.length === 0) {
    return true;
  }

  // get token from local storage or state management
 const role = localStorage.getItem('role');

// check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
  return allowedRoles.includes(role!);
}

logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.router.navigate(['/']);
}

}
