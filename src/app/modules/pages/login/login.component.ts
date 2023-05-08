import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Login } from '../../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })

  constructor(private router: Router) { }

  ngOnInit()  {}

  get email(){
    return this.loginUserForm.get('email');
  }

  get password(){
    return this.loginUserForm.get('password');
  }

  goToRegistration =  () => {
    this.router.navigateByUrl('/registration');
  };

  goToHome =  () => {
    this.router.navigateByUrl('/home');
  };
  
  public loginDTO: Login = new Login();
  
  login(){}
}
