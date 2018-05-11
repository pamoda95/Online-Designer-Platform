import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Response} from "../models/response";


@Injectable()
export class CanService {


  private  CanvasName : String;
  private  Username :String;
  private CanvasElement :Object;



  constructor(private http :HttpClient ) { }

//supports to save canvas objects
  saveCanvas(canvas:any, username: string,canvasname :string){

    this.CanvasName=canvasname;
    this.Username=username;
    this.CanvasElement=canvas;


    return this.http.post('/canvasRoutes/addCanvas', {
      CanvasName: this.CanvasName,
      Username: this.Username,
      CanvasElement: this.CanvasElement,
    })
      .subscribe(
        res => {
          console.log(res);
          console.log(" canvas Saved ");
        },
        err => {
          console.log("Error occured");
        }
      );

  }

//   getCanvas(username: string, canvasName: string) {
//     return this.http.get("http://localhost:3000/canvasRoutes/getCanvas/".concat(username).concat("/").concat(canvasName))
//       .subscribe(canvas => {
//         console.log(canvas);
//       });
//   }
// }
getCanvas(username: string, canvasName: string) {
  return this.http.get<Response>("/canvasRoutes/getCanvas/".concat(username).concat("/").concat(canvasName))
    .map(res =>res);
    }
}


