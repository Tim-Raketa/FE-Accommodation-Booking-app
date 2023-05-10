import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuestHomeComponent } from './guest-home/guest-home.component';
import { HostHomeComponent } from './host-home/host-home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    GuestHomeComponent,
    HostHomeComponent
  ]
})
export class PagesModule { }
