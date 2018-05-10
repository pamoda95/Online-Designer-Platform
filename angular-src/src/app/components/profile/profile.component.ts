import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from "../../services/profile.service";

import {forEach} from "@angular/router/src/utils/collection";
import {CanvasComponent} from "../canvas/canvas.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService],
  //directives:[CanvasComponent],

})
export class ProfileComponent implements OnInit {


  user:any;
  canveses: any[];

  constructor(
    private authService :AuthService,
    private profileService :ProfileService,
    private router  :Router
  ) { }

  ngOnInit() {


    this.authService.getProfile().subscribe(result=>{
       this.user = result;
       console.log("profie  :"+ result);

    },
    err =>{
      console.log(err);
      return false;
    });

    this.profileService.getCanvasLst(localStorage.getItem("username")).subscribe(result=>{
      this.canveses = result.canvas;
      console.log(this.canveses);
    });
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }




}
