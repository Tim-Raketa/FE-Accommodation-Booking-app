import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuestHomeComponent } from './guest-home/guest-home.component';
import { HostHomeComponent } from './host-home/host-home.component';
import { UserEditComponent } from './user-edit/user-edit.component';

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
    HostHomeComponent,
    UserEditComponent
  ]
})
export class PagesModule { }
