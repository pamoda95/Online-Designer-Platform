import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class CanService {



  private  CanvasName : String;
  private  Username :String;
  private CanvasElement :Object;



  constructor(private http :HttpClient ) { }


  registerUser(canvas:any){

    this.CanvasName=canvas.CanvasName;
    this.Username=canvas.Username;
    this.CanvasElement=canvas.CanvasElement;


    return this.http.post('http://localhost:3000/users/register', {
      CanvasName: this.CanvasName,
      Username: this.Username,
      CanvasElement: this.CanvasElement,
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

}
