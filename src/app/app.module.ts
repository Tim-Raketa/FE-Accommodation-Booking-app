import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './modules/pages/pages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AuthInterception } from './modules/pages/login/auth.interceptor';
import { GuestFlightComponent } from './modules/pages/guest-flight/guest-flight.component';


@NgModule({
  declarations: [
    AppComponent,
    GuestFlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterception,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
