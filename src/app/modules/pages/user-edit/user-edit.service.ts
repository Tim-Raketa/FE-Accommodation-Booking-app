import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { editUserDTO } from '../../model/editUserDTO';
import { Observable } from 'rxjs';
import { tokenStateDTO } from '../../model/tokenStateDTO';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

    route: string = 'http://localhost:8080/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    editUser(editUser: editUserDTO): Observable<tokenStateDTO> {
        return this.http.post<tokenStateDTO>(this.route + 'users/edit', editUser, {headers: this.headers});
      }

}
