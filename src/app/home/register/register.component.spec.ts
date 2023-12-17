import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPasswordConfirmationValid } from 'src/app/shared/validator/core-validators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { of, throwError } from 'rxjs';
import { ApiError } from 'src/app/shared/error/api-error';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { MusicService } from 'src/app/shared/services/music/music.service';

describe('Testing Register component', () => {

  const MOCK_PICTURE_URL: string = 'https://picsum.photos/200/300';

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMusicService: jasmine.SpyObj<MusicService>;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['generateRegisterForm', 'register']);
    mockMusicService = jasmine.createSpyObj('MovieService', ['getRandomIllustrationPictureUrl']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [AppModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }, { provide: MusicListService, useValue: mockMusicService }],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(RegisterComponent);
    sessionStorage.clear();
    component = fixture.componentInstance;

    component.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordConfirmation: new FormControl(null, [Validators.required])
    }, { validators: isPasswordConfirmationValid });

    mockMusicService.getRandomIllustrationPictureUrl.and.returnValue(of(MOCK_PICTURE_URL));

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should generate register form', () => {

    expect(component.registerForm.contains('username')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
    expect(component.registerForm.contains('passwordConfirmation')).toBeTrue();

  });

  it('should disable register button when form is invalid', () => {

    component.registerForm.controls['username'].setValue('username');

    fixture.detectChanges();

    expect(component.isFormValid()).toBeFalse();

    const element: DebugElement = fixture.debugElement;
    const registerButton: HTMLButtonElement = element.query(By.css('.register__button')).nativeElement;

    expect(registerButton.getAttributeNames().includes('disabled')).toBeTrue();

  });

  it('should enable register button when form is valid', () => {

    component.registerForm.controls['username'].setValue('username');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['passwordConfirmation'].setValue('password');

    fixture.detectChanges();

    expect(component.isFormValid()).toBeTrue();

    const element: DebugElement = fixture.debugElement;
    const registerButton: HTMLButtonElement = element.query(By.css('.register__button')).nativeElement;

    expect(registerButton.getAttributeNames().includes('disabled')).toBeFalse();

  });

  it('should set token to session storage when register success', () => {

    const authResponse: AuthResponse = {
      token: 'token',
      username: 'username',
      expiresAt: new Date()
    };

    component.registerForm.controls['username'].setValue('username');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['passwordConfirmation'].setValue('password');

    const registerSpy = mockAuthService.register.and.returnValue(of(authResponse));

    fixture.detectChanges();

    component.attemptRegistration();

    expect(registerSpy).toHaveBeenCalled();
    expect(sessionStorage.getItem('token')).toEqual('token');
    expect(component.apiError).toBeNull();
    expect(component.isLoading).toBeFalse();

  });

  it('should display error when register failed', () => {

    component.registerForm.controls['username'].setValue('username');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['passwordConfirmation'].setValue('password');

    const apiError: ApiError = {
      message: 'Api error',
      errorList: []
    };

    const registerSpy = mockAuthService.register.and.returnValue(throwError(() => apiError));

    fixture.detectChanges();

    component.attemptRegistration();

    expect(registerSpy).toHaveBeenCalled();
    expect(component.apiError).toEqual(apiError);
    expect(component.isLoading).toBeFalse();

  });

  it('should not attempt register when form is invalid', () => {

    component.registerForm.controls['username'].setValue('username');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['passwordConfirmation'].setValue('password2');

    const registerSpy = mockAuthService.register.and.returnValue(of());

    component.attemptRegistration();

    expect(registerSpy).toHaveBeenCalledTimes(0);

  });

});
