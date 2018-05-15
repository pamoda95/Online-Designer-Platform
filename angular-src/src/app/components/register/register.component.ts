import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service"
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

//import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // loading = false;

  name : String;
  username :String;
  email :String;
  password : String;

  //private flashMessage :FlashMessagesService add this
  constructor(
    protected validateService :ValidateService,
    protected authService :AuthService,
    protected router:Router
  ) { }

  ngOnInit() {
    //this.authService.registerUser();
  }

  onRegisterSubmit(){
    // this.loading = ;

    console.log(this.name);
    console.log(this.email);


    const user = {
      name : this.name,
      username : this.username,
      email :this.email,
      password : this.password

    };




   // Required Fields
    if(!this.validateService.validateRegister(user)){
        alert("Please fill in all fields");
      //  this.flashMessage.show('Please fill in all fields',{cssClass:'alert-danger',timeout:3000});
        return false;
    }
    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      alert("Please use a valid email");
      //this.flashMessage.show('Please use a valid email',{cssClass:'alert-danger',timeout:3000});
      return false;
    }






    this.authService.registerUser(user);

     //register user
    // this.authService.registerUser(user).subscribe(data=>{
    //   if(data.success){
    //
    //   }else {}
    // })

    // this.authService.registerUser(user).subscribe(result => {
    //   console.log("register component  " + result);
    //   if(result) {
    //     console.log("register Successful!");
    //     this.router.navigate(['/login']);
    //   } else {
    //     this.loading = false;
    //   }
    // })



  }

}
