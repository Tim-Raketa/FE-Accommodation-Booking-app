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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      jmbg: new FormControl('', [Validators.required, Validators.pattern('[0-9]{13}$')])
    }, [])

  constructor(private router: Router) {}

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

  get jmbg(){
    return this.registerUserForm.get('jmbg');
  }

  ngOnInit() {}

  goToLogin =  () => {
    this.router.navigateByUrl('/login');
  };

  goToHome =  () => {
    this.router.navigateByUrl('/home');
  };

  register =  () => {};
}
