import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './modules/pages/registration/registration.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { WelcomeComponent } from './modules/pages/welcome/welcome.component';
import { GuestHomeComponent } from './modules/pages/guest-home/guest-home.component';
import { HostHomeComponent } from './modules/pages/host-home/host-home.component';
import { UserEditComponent } from './modules/pages/user-edit/user-edit.component';
import { CreateAccommodationComponent } from './modules/pages/create-accommodation/create-accommodation.component';
import { AuthorizationGuard } from './modules/pages/login/authorization.guard';
import { RentableIntervalsViewComponent } from './modules/pages/rentable-intervals-view/rentable-intervals-view.component';
import { CreateRentableIntervalComponent } from './modules/pages/create-rentable-interval/create-rentable-interval.component';
import { GuestReservationsComponent } from './modules/pages/guest-reservations/guest-reservations.component';
import { UpdateRentableIntervalComponent } from './modules/pages/update-rentable-interval/update-rentable-interval.component';
import { HostPendingReservationsComponent } from './modules/pages/host-pending-reservations/host-pending-reservations.component';
import { HostReservationsComponent } from './modules/pages/host-reservations/host-reservations.component';
import {
  GuestVisitedAccommodationsComponent
} from "./modules/pages/guest-visited-accommodations/guest-visited-accommodations.component";
import {GuestViewGradesComponent} from "./modules/pages/guest-view-grades/guest-view-grades.component";
import {
  HostAccommodationGradesComponent
} from "./modules/pages/host-accommodation-grades/host-accommodation-grades.component";
import { HostGradesComponent } from './modules/pages/host-grades/host-grades.component';
import {GuestFlightComponent} from "./modules/pages/guest-flight/guest-flight.component";

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'guest', component: GuestHomeComponent,
    data: { allowedRoles: ['GUEST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'visited', component: GuestVisitedAccommodationsComponent,
    data: { allowedRoles: ['GUEST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'guest/grades', component: GuestViewGradesComponent,
    data: { allowedRoles: ['GUEST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'guest/flights/:id', component: GuestFlightComponent,
    data: { allowedRoles: ['GUEST'] },
    canActivate: [AuthorizationGuard]
  },
  { path: 'reservations', component: GuestReservationsComponent },
  {
    path: 'host', component: HostHomeComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'pending/accommodation/:id', component: HostPendingReservationsComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'accepted/accommodation/:id', component: HostReservationsComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'host/accommodation/:id', component: RentableIntervalsViewComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'host/accommodation/:id/createRentableInterval', component: CreateRentableIntervalComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'host/accommodation/:id/updateRentableInterval/:idr', component: UpdateRentableIntervalComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'host/accommodation/grade/:id', component: HostAccommodationGradesComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'host/createAccommodation', component: CreateAccommodationComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'host/grades', component: HostGradesComponent,
    data: { allowedRoles: ['HOST'] },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'edit', component: UserEditComponent,
    data: { allowedRoles: ['HOST', 'GUEST'] } ,
    canActivate: [AuthorizationGuard]
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
