import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Tokenresponse} from "../models/tokenresponse";
import {User} from "../models/user";
// import objectContaining = jasmine.objectContaining;

@Injectable()
export class AuthService {

  public token: string;
  public user:any;

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
          // localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          localStorage.setItem('id_token',this.token);
          localStorage.setItem('username',username);

          // return true to indicate successful login
          return true;
        } else {
          localStorage.removeItem('id_token');
          localStorage.removeItem('username');
          this.token = null;
          // return false to indicate failed login
          return false;
        }
      });
  }


  getProfile(): Observable<object> {

    this.loadToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    // let headers =new HttpHeaders();
    // headers.append('Authorization',this.token);
    // headers.append('Content-Type','application/json');
    //

    return this.http.get<User>('http://localhost:3000/users/profile',httpOptions )
      .map((response) => {
        this.user=response.user;

        console.log("auth service profile :" + this.user);
        console.log("profile response");
        console.log(response);

      return this.user ;

      });
  }

  loadToken(){
    const usertoken =localStorage.getItem('id_token');
    this.token =usertoken;


  }




  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
  }


}
