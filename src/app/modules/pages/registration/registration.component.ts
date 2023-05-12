import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerUserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      residency: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')])
    }, [])

  constructor(private router: Router) {}

  get username(){
    return this.registerUserForm.get('username');
  }

  get email(){
    return this.registerUserForm.get('email');
  }

  get password(){
    return this.registerUserForm.get('password');
  }

  get confirmPassword(){
    return this.registerUserForm.get('confirmPassword');
  }

  get name(){
    return this.registerUserForm.get('name');
  }

  get surname(){
    return this.registerUserForm.get('surname');
  }

  get residency(){
    return this.registerUserForm.get('residency');
  }

  ngOnInit() {}

  goToLogin =  () => {
    this.router.navigateByUrl('/login');
  };

  goToHome =  () => {
    this.router.navigateByUrl('/welcome');
  };

  register =  () => {};
}
