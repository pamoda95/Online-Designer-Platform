import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { LoginComponent } from './login.component';
import {AppComponent} from "../../app.component";
import {NavbarComponent} from "../navbar/navbar.component";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';




describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,NavbarComponent ],
      imports:[FormsModule ,ReactiveFormsModule]


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Login');
  }));
});
