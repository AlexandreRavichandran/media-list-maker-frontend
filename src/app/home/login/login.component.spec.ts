import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { of, throwError } from 'rxjs';
import { ApiError } from 'src/app/shared/error/api-error';

describe('Testing Login component', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['generateLoginForm', 'login']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AppModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LoginComponent);
    sessionStorage.clear();
    component = fixture.componentInstance;

    component.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should generate login form', () => {

    fixture.detectChanges();

    expect(component.loginForm.contains('username')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();

  });

  it('should disable login button when form is invalid', () => {

    component.loginForm.controls['username'].setValue('username');

    fixture.detectChanges();

    expect(component.isFormValid()).toBeFalse();

    const element: DebugElement = fixture.debugElement;
    const loginButton: HTMLButtonElement = element.query(By.css('.login__button')).nativeElement;

    expect(loginButton.getAttributeNames().includes('disabled')).toBeTrue();

  });

  it('should enable login button when form is valid', () => {

    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');

    fixture.detectChanges();

    expect(component.isFormValid()).toBeTrue();

    const element: DebugElement = fixture.debugElement;
    const loginButton: HTMLButtonElement = element.query(By.css('.login__button')).nativeElement;

    expect(loginButton.getAttributeNames().includes('disabled')).toBeFalse();

  });

  it('should set token to session storage when login success', () => {

    const authResponse: AuthResponse = {
      token: 'token',
      username: 'username',
      expiresAt: new Date()
    };

    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');

    const loginSpy = mockAuthService.login.and.returnValue(of(authResponse));

    fixture.detectChanges();

    component.attemptAuth();

    expect(loginSpy).toHaveBeenCalled();
    expect(sessionStorage.getItem('token')).toEqual('token');
    expect(component.apiError).toBeNull();
    expect(component.isLoading).toBeFalse();

  });

  it('should display error when login failed', () => {

    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');

    const apiError: ApiError = {
      message: 'Api error',
      errorList: []
    };

    const loginSpy = mockAuthService.login.and.returnValue(throwError(() => apiError));

    fixture.detectChanges();

    component.attemptAuth();

    expect(loginSpy).toHaveBeenCalled();
    expect(component.apiError).toEqual(apiError);
    expect(component.isLoading).toBeFalse();

  });

  it('should not attempt login when form is invalid', () => {

    component.loginForm.controls['username'].setValue('username');

    const loginSpy = mockAuthService.login.and.returnValue(of());

    fixture.detectChanges();

    component.attemptAuth();

    expect(loginSpy).toHaveBeenCalledTimes(0);

  });

});
