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
import { HostGradeDTO } from '../../model/host-grade-dto.model';
import { HostGradeForUserDTO } from '../../model/host-grade-for-user-dto.model';

@Component({
  selector: 'app-guest-view-grades',
  templateUrl: './guest-view-grades.component.html',
  styleUrls: ['./guest-view-grades.component.css']
})
export class GuestViewGradesComponent {
  public dataSource = new MatTableDataSource<GradeDTO>();
  public dataSource2 = new MatTableDataSource<HostGradeDTO>();

  public displayedColumns = ['accommodationName', 'grade', 'delete', 'update'];
  public displayedColumns2 = ['host', 'grade', 'delete', 'update'];
  public grades: GradeForUserDTO[] = [];
  public hostGrades: HostGradeForUserDTO[] = [];
  public name:String="";
  public accommodationId:number=0;
  public hostId: string = '';
  public show:Boolean=false;
  public showHost: boolean = false;
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

    this.graderService.getHostGradesByUser(username).subscribe(res=>{
      this.hostGrades = res.map(hostGrade => new HostGradeForUserDTO(hostGrade));
      this.hostGrades.forEach(hostGrade =>{
        this.graderService.getUser(hostGrade.hostId).subscribe(host =>
          hostGrade.hostNameSurname = host.name + ' ' + host.surname)
      })
      this.dataSource2.data = this.hostGrades;
    });
  }

  delete(accommodationID: number){
     var grade:GradeDTO=new GradeDTO();
     grade.accommodationId=accommodationID;
     grade.username=localStorage.getItem("token")??"";
     this.graderService.DeleteGrade(grade).subscribe(
       created=>{if(created)
         alert("You have successfully deleted this grade.")

       else
         alert("Something went wrong!!")
         location.reload();
       
       })

  }

  deleteHost(hostId: string){
    var hostGrade: HostGradeDTO = new HostGradeDTO;
    hostGrade.hostId = hostId;
    hostGrade.username = localStorage.getItem("token")??"";
    this.graderService.deleteHostGrade(hostGrade).subscribe(
      created=>{if(created)
        alert("You have successfully deleted this grade.")

      else
        alert("Something went wrong!!")
        location.reload();
      
      })
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
        alert("You have successfully updated this grade.")
      else
        alert("Something went wrong!!")
      })
    location.reload();

  }

  updateHost(){
    let GradeNum=Number(this.GradeForm.get("grade")?.value);
    var hostGrade: HostGradeDTO = {
      hostId: this.hostId,
      username: localStorage.getItem("token")??"",
      grade: GradeNum,
      timeStamp: JSON.stringify(new Date())
    }

    hostGrade.timeStamp = hostGrade.timeStamp.substring(1,hostGrade.timeStamp.length-2)

    this.graderService.updateHostGrade(hostGrade).subscribe(
      created=>{if(created)
        alert("You have successfully updated this grade.")
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
      this.showHost = false;
  }

  showUpdateHost(id: string){
    this.hostId = id;
    this.showHost = true;
    this.show = false;
  }
}
