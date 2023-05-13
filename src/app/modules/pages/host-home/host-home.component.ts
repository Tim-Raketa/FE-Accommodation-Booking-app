import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-home',
  templateUrl: './host-home.component.html',
  styleUrls: ['./host-home.component.css']
})
export class HostHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };

}
