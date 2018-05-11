import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule,Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { CanvasComponent } from './canvas.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {FormBuilder ,FormGroup} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {CanService} from "../../services/can.service";
import {RegisterComponent} from "../register/register.component";
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {LoginComponent} from "../login/login.component";
import {AppComponent} from "../../app.component";

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    const appRoutes :Routes =[
      {path :'' ,component:HomeComponent},
      {path :'register' ,component:RegisterComponent},
      {path :'login' ,component:LoginComponent},
      {path :'profile' ,component:ProfileComponent},
      {path :'canvas',component:CanvasComponent}
    ];
    TestBed.configureTestingModule({
      declarations: [ AppComponent,CanvasComponent ],
      imports:[
        FormsModule ,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
      ],
      providers:[
        FormGroup,
        FormBuilder,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        NgbModule,
        ProfileService,
        CanService,
        NgModule
      ]

    })
    .compileComponents();
  }));
  TestBed.createComponent(CanvasComponent);
  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
