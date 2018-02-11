import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule,Routes} from "@angular/router";



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import { NavbarProfileComponent } from './components/navbar-profile/navbar-profile.component';
import { CanvasComponent } from './components/canvas/canvas.component';
//import {FlashMessagesModule} from "angular2-flash-messages";

const appRoutes :Routes =[
  {path :'' ,component:HomeComponent},
  {path :'register' ,component:RegisterComponent},
  {path :'login' ,component:LoginComponent},
  {path :'dashboard' ,component:DashboardComponent},
  {path :'profile' ,component:ProfileComponent},
  {path :'canvas',component:CanvasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarProfileComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //HttpModule,
    RouterModule.forRoot(appRoutes),
    //FlashMessagesModule
    ReactiveFormsModule

  ],
  providers: [ValidateService ,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
