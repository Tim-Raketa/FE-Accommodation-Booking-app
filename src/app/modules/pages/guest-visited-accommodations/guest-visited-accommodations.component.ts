import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
import {AccommodationService} from "../../services/accommodation.service";
import {MatTableDataSource} from "@angular/material/table";
import {ReservationIdsDTO} from "../../model/reservationIdsDTO";
import {AccommodationDTO} from "../../model/accommodation-dto.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GradeDTO} from "../../model/GradeDTO";
import {GraderService} from "../../services/grader.service";

@Component({
  selector: 'app-guest-visited-accommodations',
  templateUrl: './guest-visited-accommodations.component.html',
  styleUrls: ['./guest-visited-accommodations.component.css']
})
export class GuestVisitedAccommodationsComponent {

  public dataSource = new MatTableDataSource<AccommodationDTO>();
  public displayedColumns = ['name', 'location', 'perks', 'grade'];
  public accommodations: AccommodationDTO[] = [];
  public accommodationId:number=0;
  public show:boolean=false;
  GradeForm = new FormGroup({
    grade: new FormControl('', Validators.required),
  });
  constructor(private router: Router,
              private authService: AuthService,
              private accommodationService: AccommodationService,
              private graderService:GraderService
  ) { }
  ngOnInit() {
    let username = localStorage.getItem("token")??"";
    this.accommodationService.HasVisited(username).subscribe(res=> {
    this.accommodations=res;
    this.dataSource.data=res;
    });

  }


  grade(){
    let GradeNum=Number(this.GradeForm.get("grade")?.value);
    var grade:GradeDTO={
      username:localStorage.getItem("token")??"",
      grade:GradeNum,
      accommodationId:this.accommodationId,
      timeStamp:JSON.stringify(new Date())
    }
    grade.timeStamp=grade.timeStamp.substring(1,grade.timeStamp.length-2)
    this.graderService.CreateGrade(grade).subscribe(
      created=>{if(created)
        alert("You have successfully graded this establishment.")
        else
        alert("You have already graded this establishment!!!!" +
          " You can edit or delete the current one if " +
          "you want ot grade this accommodation again.")
      })
  }




  logout() {
    this.authService.logout();
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

  home =  () => {
    this.router.navigateByUrl('/guest');
  };

  welcome =  () => {
    this.router.navigateByUrl('/welcome');
  };
  showGrades() {
    this.router.navigateByUrl('/guest/grades');
  }
  visited() {
    this.router.navigateByUrl('/visited');
  }

  showGrader(id:number) {
    this.accommodationId=id;
    this.show=true;
  }
}
