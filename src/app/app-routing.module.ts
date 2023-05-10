import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './modules/pages/registration/registration.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { WelcomeComponent } from './modules/pages/welcome/welcome.component';
import { GuestHomeComponent } from './modules/pages/guest-home/guest-home.component';
import { HostHomeComponent } from './modules/pages/host-home/host-home.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'guest', component: GuestHomeComponent },
  { path: 'host', component: HostHomeComponent },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
