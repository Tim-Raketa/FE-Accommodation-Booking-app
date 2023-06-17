import { Component, OnInit } from '@angular/core';
import { HostGradeDTO } from '../../model/host-grade-dto.model';
import {MatTableDataSource} from "@angular/material/table";
import { Router, ActivatedRoute } from '@angular/router';
import { GraderService } from '../../services/grader.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-host-grades',
  templateUrl: './host-grades.component.html',
  styleUrls: ['./host-grades.component.css']
})
export class HostGradesComponent implements OnInit{
  public dataSource = new MatTableDataSource<HostGradeDTO>();
  public displayedColumns = ['username', 'grade', 'timeStamp'];
  public grades: HostGradeDTO[] = [];
  public avgGrade: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private graderService:GraderService , private authService: AuthService) { }

  ngOnInit(): void {
    let username = localStorage.getItem("token")??"";
    this.graderService.getGradesForHost(username).subscribe(res=>{
      this.grades = res;
      this.dataSource.data = this.grades;
    })

    this.graderService.getAvgHostGrade(username).subscribe(res=>{
      this.avgGrade = res;
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

  goBack(){
    this.router.navigateByUrl('/host');
  }

}
