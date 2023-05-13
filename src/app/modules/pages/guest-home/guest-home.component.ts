import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.css']
})
export class GuestHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editProfile =  () => {
    this.router.navigateByUrl('/edit');
  };
  
}
