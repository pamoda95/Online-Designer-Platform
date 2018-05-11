import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Response} from "../models/response";
import {CanvasesResponse} from "../models/CanvasesResponse";

@Injectable()
export class ProfileService {



  constructor(private http :HttpClient) { }

  getCanvasLst(username:string){
    return this.http.get<CanvasesResponse>("/canvasRoutes/getCanvases/".concat(username))
      .map(res=>res);

  }

}



