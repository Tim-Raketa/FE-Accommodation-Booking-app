import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Login } from '../../model/login';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit()  {}

  get username(){
    return this.loginUserForm.get('username');
  }

  get password(){
    return this.loginUserForm.get('password');
  }

  goToRegistration =  () => {
    this.router.navigateByUrl('/registration');
  };

  goToHome =  () => {
    this.router.navigateByUrl('/welcome');
  };
  
  public loginDTO: Login = new Login();
  
  login(){
    this.loginDTO.username = this.loginUserForm.get("username")?.value as string
    this.loginDTO.password = this.loginUserForm.get("password")?.value as unknown as string
    console.log(this.loginDTO)
    this.authService.login(this.loginDTO).subscribe(res => {

      let accessToken = res.accessToken
      let role = res.role
      if(accessToken == ''){
        alert("Wrong email or password!") 
      } else {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('role', role);
  
        if (role == 'HOST') this.router.navigate(['/host']);
        else if (role == 'GUEST') this.router.navigate(['/guest']);
        else {
             localStorage.removeItem('token');
             this.router.navigate(['/']);
           }
      }
      });
  }
}
