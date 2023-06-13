import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
import {AccommodationService} from "../../services/accommodation.service";
import {GraderService} from "../../services/grader.service";
import {AccommodationDTO} from "../../model/accommodation-dto.model";
import {GradeDTO} from "../../model/GradeDTO";
import {MatTableDataSource} from "@angular/material/table";
import {GradeForUserDTO} from "../../model/GradeForUserDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-guest-view-grades',
  templateUrl: './guest-view-grades.component.html',
  styleUrls: ['./guest-view-grades.component.css']
})
export class GuestViewGradesComponent {
  public dataSource = new MatTableDataSource<GradeDTO>();

  public displayedColumns = ['accommodationName', 'grade', 'delete', 'update'];
  public grades: GradeForUserDTO[] = [];
  public name:String="";
  public accommodationId:number=0;
  public show:Boolean=false;
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
    this.graderService.getGradesForUser(username).subscribe(
        res=> {
          this.grades = res.map(
            grade => new GradeForUserDTO(grade));
          this.grades.forEach(grade => {
            this.accommodationService.getAccommodationById(grade.accommodationId)
              .subscribe(accommodation => grade.accommodationName=accommodation.name)
          })
          this.dataSource.data=this.grades;
        });
  }
  delete(accommodationID: number){
     var grade:GradeDTO=new GradeDTO();
     grade.accommodationId=accommodationID;
     grade.username=localStorage.getItem("token")??"";
  }

  update(){
    let GradeNum=Number(this.GradeForm.get("grade")?.value);
    var grade:GradeDTO={
      username:localStorage.getItem("token")??"",
      grade:GradeNum,
      accommodationId:this.accommodationId,
      timeStamp:JSON.stringify(new Date())
    }
    grade.timeStamp=grade.timeStamp.substring(1,grade.timeStamp.length-2)
    this.graderService.UpdateGrade(grade).subscribe(
      created=>{if(created)
        alert("You have successfully updated the grading this establishment.")
      else
        alert("Something went wrong!!")
      })
    location.reload();

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

  visited() {
    this.router.navigateByUrl('/visited');
  }

  showUpdate(id: number) {
      this.accommodationId=id;
      this.show=true;
  }
}
