import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDTO} from "../model/accommodation-dto.model";
import {GradeDTO} from "../model/GradeDTO";
import { registerUserDTO } from "../model/registerUserDTO";
import { HostGradeDTO } from "../model/host-grade-dto.model";

@Injectable({
  providedIn: 'root'
})
export class GraderService {
  route: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  CreateGrade(grade: GradeDTO): Observable<boolean>{
    return this.http.post<boolean>(this.route + '/accommodations/grader/',grade, {headers: this.headers});
  }
  UpdateGrade(grade: GradeDTO): Observable<boolean>{
    return this.http.put<boolean>(this.route + '/accommodations/grader/',grade, {headers: this.headers});
  }
  DeleteGrade(grade: GradeDTO): Observable<any>{
    return this.http.delete<any>(this.route + '/accommodations/grader/'+grade.accommodationId+'/'+grade.username);
  }

  getGradesForAccommodation(accommodationId: number): Observable<GradeDTO[]>{
    return this.http.get<GradeDTO[]>(this.route + '/accommodations/grader/'+accommodationId, {headers: this.headers});
  }
  getGradesForUser(username: string): Observable<GradeDTO[]>{
    return this.http.get<GradeDTO[]>(this.route + '/accommodations/grader/username='+username, {headers: this.headers});
  }
  GetSpecificGrade(accommodationId: number,username:string): Observable<GradeDTO>{
    return this.http.get<GradeDTO>(this.route + '/accommodations/grader/'+accommodationId+'/'+username, {headers: this.headers});
  }
  GetAvgGrade(accommodationId: number): Observable<number>{
    return this.http.get<number>(this.route + '/accommodations/grader/avg/'+accommodationId, {headers: this.headers});
  }

  getUser(username: string): Observable<registerUserDTO>{
    return this.http.get<registerUserDTO>(this.route + 'users/getUser/' + username, {headers: this.headers});
  }

  createHostGrade(hostGrade: HostGradeDTO): Observable<boolean>{
    return this.http.post<boolean>(this.route + '/accommodations/grader/host', hostGrade, {headers: this.headers});
  }

  getHostGradesByUser(username: string): Observable<HostGradeDTO[]>{
    return this.http.get<HostGradeDTO[]>(this.route + '/accommodations/grader/host/username='+username, {headers: this.headers});
  }

  deleteHostGrade(hostGrade: HostGradeDTO): Observable<any>{
    return this.http.delete<any>(this.route + '/accommodations/grader/host/' + hostGrade.hostId + '/' + hostGrade.username);
  }

  updateHostGrade(hostGrade: HostGradeDTO): Observable<boolean>{
    return this.http.put<boolean>(this.route + '/accommodations/grader/host', hostGrade, {headers: this.headers});
  }

}
