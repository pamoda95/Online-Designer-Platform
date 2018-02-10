import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder ,FormGroup,Validators} from "@angular/forms";
import 'fabric';
declare const fabric: any;
//declare const jsPDF ;
import * as jsPDF from 'jspdf'
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
  private textString;

  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {
      // selection: false,
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      width : 200,
      height: 200,
    });
    console.log(this.canvas);

    //
    let rect =new fabric.Rect({
      left :0,
      top:0,
      width :100,
      height :100

    });

    this.canvas.add(rect);
    rect.set('fill','red');



    let imgData = this.canvas.toDataURL("image/jpeg", 1.0);
    let pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");





  }
  getText(){
    alert(this.textString);

  }




  // get image from user
  createForm() {
    this.form = this.fb.group({
      // name: ['', Validators.required],
      //avatar: null,
      addImg : ['', Validators.required],
    });
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('addImg').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }
  clearFile() {
    this.form.get('addImg').setValue(null);
    this.fileInput.nativeElement.value = '';
  }



}
