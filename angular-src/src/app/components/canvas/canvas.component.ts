import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder ,FormGroup,Validators} from "@angular/forms";

import {ProfileService} from "../../services/profile.service";
import {CanService} from "../../services/can.service";
import 'fabric';
declare const fabric: any;
//declare const jsPDF ;
import * as jsPDF from 'jspdf';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


//import * as domtoimage from 'dom-to-image';
//import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [CanService]
})
export class CanvasComponent implements OnInit {

  //to display canvas list of user
  user :any;
  canveses: any[];
  // image
  form: FormGroup;
  loading: boolean = false;

  canvasname :string;
  canvas;
  //get text
 textString;
  //upload img
  url: string = '';
  backgroundImgUrl:string="";
  canvasElementArr: any;

  size: any = {
    width: 500,
    height: 300
  };


  props: any = {
    canvasFill: '#ffffff',
    fill: null,
    fontSize: null,
    charSpacing: null,
    fontStyle: null,
    fontFamily: null,
  };

  json: any;
  globalEditor: boolean = false;
  textEditor: boolean = false;
  imageEditor: boolean = false;
  figureEditor: boolean = false;
  selected: any;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    protected fb: FormBuilder,
    protected canService :CanService,
    protected profileService :ProfileService,
    protected authService :AuthService,
    protected router  :Router
  ) {
    // this.createForm();
  }

  ngOnInit() {

    this.user=localStorage.getItem('username');

   //to display canvas list of user
    this.profileService.getCanvasLst(localStorage.getItem("username")).subscribe(result=>{
      this.canveses = result.canvas;
      console.log(this.canveses);
    });

    this.canvas = new fabric.Canvas('canvas', {
      // selection: false,
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      width :this.size.width,
      height: this.size.height,
    });



    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {

        console.log('@@@@@object selected ',e.target.type);
        let selectedObject = e.target;


        this.selected = selectedObject;
        console.log('selected :',this.selected);
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;


        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {



          switch (selectedObject.type) {
            case 'text':
              this.textEditor = true;
              console.log('textEditor:',this.textEditor);
              this.getCharSpacing();
              this.getFill();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });

  }




  //To change canvas size
  changeSize() {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

//get text from user
  getText(){
    let text = new fabric.Text(this.textString, { left: 100, top: 100 });
    this.canvas.add(text);
    this.textString='';

  }
//set background of the canvas
  setBackgroundImage(url){

    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });

        //set background Image
        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
          backgroundImageOpacity: 0.5,
          backgroundImageStretch: false
        });
        //this.selectItemAfterAdded(image);
      });
    }

  }
  //read image url
  readBackgroundImagUrl(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this. backgroundImgUrl = event.target['result'];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeBackgroundImage(url) {
    this. backgroundImgUrl = '';
  };



  // get image from user
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

         //this.selectItemAfterAdded(image);
      });
    }
  }

  //read image url
  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
        console.log(this.url);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };


  getImgPolaroid(event: any) {
    let el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({

        angle: 0,
        padding: 10,
        hasRotatingPoint: true,
      });
      //set background Image
      this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
        backgroundImageOpacity: 0.5,
        backgroundImageStretch: false
      });
    });
  }




 //save the canvas as JSON object
  saveCanvasToJSON() {

    console.log(this.canvasname);
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
   //  console.log('json');
     console.log(json);
    this.canService.saveCanvas(json, localStorage.getItem("username"),this.canvasname);


  }

  //get canvas from database and load it to canvas
  loadCanvasFromJSON(canvasName) {

    this.canService.getCanvas(localStorage.getItem("username"), canvasName).subscribe(
      (data) => {

        // console.log(data);

        console.log("canvas");
        this.canvasElementArr= data.canvas;
        console.log("load canvas from json");
        console.log(this.canvasElementArr);
        // console.log(data.canvas.CanvasElement);

        this.canvas.loadFromJSON(this.canvasElementArr.CanvasElement, () => {

          this.canvas.renderAll();

        });

      }
    );


  };

  //get the active style of the selected object

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }

//change the style of the selected object
  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      let style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }

  //get selected object of the canvas
  getActiveProp(name) {
    let object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  //change  selected object of the canvas
  setActiveProp(name, value) {
    let object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  //change the font size
  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

//get the character spacing of selected text
  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }
//change  the character spacing of selected text
  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }
//get the active color of the selected text
  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }
//change the active color of the selected text
  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }
//get the font style of the selected text
  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }
//change the font
  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }

//get the font family of selected object
  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  //change the font family of selected object
  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }





//remove the selected object
  removeSelected() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      let self = this;
      objectsInGroup.forEach(function (object) {
        self.canvas.remove(object);
      });
    }
  }




//download  canvas image as pdf
  downloadPDF(){

    let imgData = this.canvas.toDataURL("image/jpeg", 1.0);
    let pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");

  }

  //clear the canvas
  confirmClear() {
      this.canvas.clear();
  }



  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }



}
