import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { registerUserDTO } from '../../model/registerUserDTO';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editUserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    residency: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')])
  }, [])
  
  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(res => {
      this.editUserForm.patchValue({
        username: res.username,
        password: res.password,
        name: res.name,
        surname: res.surname,
        email: res.email,
        residency: res.residency
      })
    })
  }

  get username(){
    return this.editUserForm.get('username');
  }

  get email(){
    return this.editUserForm.get('email');
  }

  get password(){
    return this.editUserForm.get('password');
  }

  get confirmPassword(){
    return this.editUserForm.get('confirmPassword');
  }

  get name(){
    return this.editUserForm.get('name');
  }

  get surname(){
    return this.editUserForm.get('surname');
  }

  get residency(){
    return this.editUserForm.get('residency');
  }

  goToHome =  () => {
    if(localStorage.getItem('role') == "HOST"){
      this.router.navigateByUrl('/host');
    } else if (localStorage.getItem('role') == "GUEST"){
      this.router.navigateByUrl('/guest');
    }
    
  };

}
