import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from 'src/app/app.module';

describe('Testing Login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should generate login form', () => {

    expect(component.loginForm.contains('username')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();

  });

  it('should disable login button when form is invalid', () => {

    component.loginForm.controls['username'].setValue('username');
    expect(component.isFormValid()).toBeFalse();

  });

  it('should enable login button when form is valid', () => {

    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');
    expect(component.isFormValid()).toBeTrue();

  });

});
