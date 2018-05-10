import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule,Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import { CanvasComponent } from './components/canvas/canvas.component';
import {ProfileService} from "./services/profile.service";
//import {FlashMessagesModule} from "angular2-flash-messages";
import { ColorPickerModule } from 'ngx-color-picker';

const appRoutes :Routes =[
  {path :'' ,component:HomeComponent},
  {path :'register' ,component:RegisterComponent},
  {path :'login' ,component:LoginComponent},
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
    ProfileComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //HttpModule,
    RouterModule.forRoot(appRoutes),
    //FlashMessagesModule
    ReactiveFormsModule,
    ColorPickerModule,
    NgbModule

  ],
  providers: [ValidateService ,AuthService,ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
