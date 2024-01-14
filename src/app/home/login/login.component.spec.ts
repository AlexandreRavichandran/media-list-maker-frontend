import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of} from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppUserState } from '../state/app-user.state';
import { AppUserPageActions } from '../state/actions';
import { AuthRequest } from 'src/app/shared/models/auth/auth-request';

fdescribe('Testing Login component', () => {

  const MOCK_PICTURE_URL: string = 'https://picsum.photos/200/300';
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let store: MockStore<AppUserState>;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['generateLoginForm']);
    mockMovieService = jasmine.createSpyObj('MovieService', ['getRandomIllustrationPictureUrl'])
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AppModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: MovieService, useValue: mockMovieService },
        provideMockStore({})
      ],
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


    mockMovieService.getRandomIllustrationPictureUrl.and.returnValue(of(MOCK_PICTURE_URL));
    store = TestBed.inject(MockStore);
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

  it('should call loading and login action when form is valid', () => {

    const authRequest: AuthRequest = {
      username: 'username',
      password: 'password'
    };

    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');

    fixture.detectChanges();

    spyOn(store, 'dispatch');

    component.attemptAuth();

    expect(store.dispatch).toHaveBeenCalledWith(AppUserPageActions.toggleLoading());
    expect(store.dispatch).toHaveBeenCalledWith(AppUserPageActions.login({ credentials: authRequest }));

  });

  it('should not attempt login when form is invalid', () => {

    spyOn(store, 'dispatch');

    const authRequest: AuthRequest = {
      username: 'username',
      password: 'password'
    };

    component.loginForm.controls['username'].setValue('username');

    fixture.detectChanges();

    component.attemptAuth();

    expect(store.dispatch).toHaveBeenCalledTimes(0);

  });

});
