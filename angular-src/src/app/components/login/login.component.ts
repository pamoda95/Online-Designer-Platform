import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
//import {Flashm}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private username :string;
  private password :string;
 // model: any = {};
  loading = false;
 // error = '';



  constructor(
    private authService:AuthService,
    private router:Router
    //flshmsg
  ) { }

  ngOnInit() {

  }

  onLoginSubmit(){
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe(result => {
      //console.log("login component  " + result);
      if(result) {
        console.log("Login Successful!");
        this.router.navigate(['/profile']);
      } else {
        console.log("Username or password is incorrect");
        this.loading = false;
      }
    })

  }




}