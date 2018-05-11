import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder ,FormGroup,Validators} from "@angular/forms";

import {ProfileService} from "../../services/profile.service";
import {CanService} from "../../services/can.service";
import 'fabric';
declare const fabric: any;
//declare const jsPDF ;
import * as jsPDF from 'jspdf';


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
    // canvasImage: '',
    // id: null,
    // opacity: null,
    fill: null,
    fontSize: null,
    // lineHeight: null,
    charSpacing: null,
    // fontWeight: null,
    fontStyle: null,
    // textAlign: null,
    fontFamily: null,
    // TextDecoration: ''
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
  ) {
    // this.createForm();
  }

  ngOnInit() {

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
        // selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

         // this.getId();
         // this.getOpacity();

          switch (selectedObject.type) {
            // case 'rect':
            // case 'circle':
            // case 'triangle':
            //   this.figureEditor = true;
            //   this.getFill();
            //   break;
            case 'text':
              this.textEditor = true;
              console.log('textEditor:',this.textEditor);
             // this.getLineHeight();
              this.getCharSpacing();
             // this.getBold();
             // this.getFontStyle();
              this.getFill();
             // this.getTextDecoration();
             // this.getTextAlign();
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

    // this.canService.getCanvas("pamo", "name");
  }




  //To change canvas size
  changeSize() {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }


  getText(){
    let text = new fabric.Text(this.textString, { left: 100, top: 100 });
    this.canvas.add(text);
    this.textString='';

  }

  setBackgroundImage(url){

    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });

        // image.setWidth(this.size.width);
        // image.setHeight(this.size.height);


        //set background Image
        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
          backgroundImageOpacity: 0.5,
          backgroundImageStretch: false
        });
        //this.selectItemAfterAdded(image);
      });
    }

  }
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





  saveCanvasToJSON() {

    console.log(this.canvasname);
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
   //  console.log('json');
     console.log(json);
    this.canService.saveCanvas(json, localStorage.getItem("username"),this.canvasname);


  }


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



    //let CANVAS = localStorage.getItem('Kanvas');
    //console.log('CANVAS');
    //console.log(CANVAS);

    // and load everything from the same json

    // this.canvas.loadFromJSON(CANVAS, () => {
    //   console.log('CANVAS untar');
    //   console.log(CANVAS);
    //
    //
    //   this.canvas.renderAll();
    //
    //   console.log(this.canvas);
    // });

  };

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


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

  getActiveProp(name) {
    let object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    let object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }


  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }


  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }






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





  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }



}
