import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from '../../custom-validators/passwordMatch';
import { RegistrationService } from './registration.service';
import { registerUserDTO } from '../../model/registerUserDTO';

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
      residency: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
      type: new FormControl('', Validators.required),
    }, [passwordMatch("password", "confirmPassword")])

  constructor(private router: Router, private service: RegistrationService) {}

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

  register =  () => {
    let username = this.registerUserForm.get("username")?.value
    let password = this.registerUserForm.get("password")?.value
    let name = this.registerUserForm.get("name")?.value
    let surname = this.registerUserForm.get("surname")?.value
    let email = this.registerUserForm.get("email")?.value
    let residency = this.registerUserForm.get("residency")?.value
    let type = this.registerUserForm.get("type")?.value
    let user: registerUserDTO = {
      username: username ? username : '',
      password: password ? password : '',
      name: name ? name : '',
      surname: surname ? surname : '',
      email: email ? email : '',
      residency: residency ? residency : '',
      type: type ? type : '',
    }
    this.service.submit(user).subscribe(res => {
      console.log(res);
      if (res === true) {
      alert("Registration completed.");
      this.registerUserForm.reset( { } );
      } else {
      alert("Username already exists, try another.");
      }
    }, error => 
    {
      console.log(error)
    }
    
    );
      
  };
}
