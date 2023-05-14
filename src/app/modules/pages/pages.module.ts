import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuestHomeComponent } from './guest-home/guest-home.component';
import { HostHomeComponent } from './host-home/host-home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { RentableIntervalsViewComponent } from './rentable-intervals-view/rentable-intervals-view.component';
import { CreateRentableIntervalComponent } from './create-rentable-interval/create-rentable-interval.component';
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    GuestHomeComponent,
    HostHomeComponent,
    UserEditComponent,
    CreateAccommodationComponent,
    RentableIntervalsViewComponent,
    CreateRentableIntervalComponent,
    GuestReservationsComponent
  ]
})
export class PagesModule { }
