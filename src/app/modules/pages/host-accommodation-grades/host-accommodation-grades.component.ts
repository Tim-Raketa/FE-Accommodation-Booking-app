import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccommodationService} from "../../services/accommodation.service";
import {AuthService} from "../login/auth.service";
import {GraderService} from "../../services/grader.service";
import {MatTableDataSource} from "@angular/material/table";
import {PendingReservations} from "../../model/pendingReservations";
import {GradeDTO} from "../../model/GradeDTO";

@Component({
  selector: 'app-host-accommodation-grades',
  templateUrl: './host-accommodation-grades.component.html',
  styleUrls: ['./host-accommodation-grades.component.css']
})
export class HostAccommodationGradesComponent {
  public dataSource = new MatTableDataSource<GradeDTO>();
  public displayedColumns = ['username', 'grade', 'timeStamp'];
  public grades: GradeDTO[] = [];
  accommodationId: any

    constructor(private router: Router, private route: ActivatedRoute, private graderService:GraderService , private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.accommodationId = params['id']
      this.graderService.getGradesForAccommodation(this.accommodationId).subscribe(res =>{
        this.grades = res;
        this.dataSource.data = this.grades;
      })
    })
  }
  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  logout() {
    this.authService.logout();
  }
}
