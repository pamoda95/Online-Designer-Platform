import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {  RegisterResponse  } from '../models/register-response';
import {Tokenresponse} from "../models/tokenresponse";


@Injectable()
export class AuthService {
//  authToken :any ;
 // user :any ;
  public token: string;
  private  name : String;
  private username :String;
  private email :String;
  private password : String;


  constructor(private http :HttpClient ) { }

  registerUser(user:any){
    console.log("auth");
    console.log(user);
    this.name=user.name;
    this.username=user.username;
    this.email=user.email;
    this.password=user.password;

    return this.http.post('http://localhost:3000/users/register', {
      name: this.name,
      username: this.username,
      email: this.email,
      password:this.password

    })
      .subscribe(
        res => {
          console.log(res);
          console.log("444444 registered");
        },
        err => {
          console.log("Error occured");
        }
      );

  }


  // registerUser(user: any) :Observable<boolean>{
  //   //let headers = new HttpHeaders() ;
  //  // headers.append('Content-Type','application/json');
  //   //return this.http.post('http://localhost:3000/users/register',this.user,{headers:headers}).map(res => res);
  //   return this.http.post< RegisterResponse>('http://localhost:3000/users/register',{user:user} )
  //     .map((response) => {
  //        console.log(response.msg );
  //        console.log(response.success);
  //        if (response.success){
  //          return true ;
  //        }else {
  //          return false;
  //        }
  //     });
  // }

  // authenticate user replaced by this
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<Tokenresponse>('http://localhost:3000/users/authenticate', {username: username, password: password})
      .map((response) => {
        // login successful if there's a jwt token in the response
        const token = response.token;
        //console.log(response.token);
        console.log(token);
        console.log(response.user);


        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }


}
