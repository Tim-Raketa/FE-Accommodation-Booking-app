import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module'; 
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
import { FormsModule } from '@angular/forms';
import { UpdateRentableIntervalComponent } from './update-rentable-interval/update-rentable-interval.component';
import { HostPendingReservationsComponent } from './host-pending-reservations/host-pending-reservations.component';
import { HostReservationsComponent } from './host-reservations/host-reservations.component';
import { GuestVisitedAccommodationsComponent } from './guest-visited-accommodations/guest-visited-accommodations.component';
import { GuestViewGradesComponent } from './guest-view-grades/guest-view-grades.component';
import { HostAccommodationGradesComponent } from './host-accommodation-grades/host-accommodation-grades.component';
import { HostGradesComponent } from './host-grades/host-grades.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
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
    GuestReservationsComponent,
    UpdateRentableIntervalComponent,
    HostPendingReservationsComponent,
    HostReservationsComponent,
    GuestVisitedAccommodationsComponent,
    GuestViewGradesComponent,
    HostAccommodationGradesComponent,
    HostGradesComponent
  ]
})
export class PagesModule { }
