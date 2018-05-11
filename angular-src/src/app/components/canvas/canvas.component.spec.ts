import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {FormBuilder ,FormGroup} from "@angular/forms";


describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasComponent ],
      imports:[
        FormsModule ,
        ReactiveFormsModule,
        FormBuilder ,
        FormGroup
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
