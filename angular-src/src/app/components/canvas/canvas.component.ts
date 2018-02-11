import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder ,FormGroup,Validators} from "@angular/forms";
import 'fabric';
declare const fabric: any;
//declare const jsPDF ;
import * as jsPDF from 'jspdf'


import * as domtoimage from 'dom-to-image';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  // image
  form: FormGroup;
  loading: boolean = false;

  private canvas;
  //get text
  private textString;
  //upload img
  private url: string = '';

  private size: any = {
    width: 500,
    height: 800
  };

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder) {
    // this.createForm();
  }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {
      // selection: false,
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      width :this.size.width,
      height: this.size.height,
    });
    console.log(this.canvas);


  }


  changeSize(event: any) {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }


  getText(){
    let text = new fabric.Text(this.textString, { left: 100, top: 100 });
    this.canvas.add(text);
    this.textString='';

  }


  // // get image from user
  addImageOnCanvas(url) {
    if (url) {

      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.setWidth(200);
        image.setHeight(200);
        // this.extend(image, this.randomId());
        this.canvas.add(image);
        // this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };





  saveCanvasToJSON() {
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });

  };













  downloadPDF(){

    let imgData = this.canvas.toDataURL("image/jpeg", 1.0);
    let pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");

  }








}
