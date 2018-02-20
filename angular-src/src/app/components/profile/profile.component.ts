import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(
    private authService :AuthService,
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
  }


  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }


}
