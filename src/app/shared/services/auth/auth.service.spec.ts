import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthResponse } from '../../models/auth/auth-response';
import { AuthRequest } from '../../models/auth/auth-request';
import { AppUser } from '../../models/appuser/appuser';

describe('Testing Auth service', () => {

  let service: AuthService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {

    const responseBody: AuthResponse = {
      token: 'jwttest',
      expiresAt: new Date(),
      username: 'Username'
    };

    const requestBody: AuthRequest =
    {
      username: 'username',
      password: 'password'
    };

    service.login(requestBody)
      .subscribe(response => {
        expect(response).toEqual(responseBody);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/login');

    expect(request.request.method).toEqual('POST');
    request.flush(responseBody);

  });

  it('should register', () => {

    const responseBody: AuthResponse = {
      token: 'jwttest',
      expiresAt: new Date(),
      username: 'Username'
    };

    const requestBody: AppUser =
    {
      username: 'username',
      password: 'password'
    };

    service.register(requestBody)
      .subscribe(response => {
        expect(response).toEqual(responseBody);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/register');

    expect(request.request.method).toEqual('POST');
    request.flush(responseBody);

  });

  it('should remove token from session when logout', () => {
    
    sessionStorage.setItem('token', 'testtoken');

    service.logout();

    expect(sessionStorage.getItem('token')).toBeNull();

  });

  it('should return user token', () => {
    
    sessionStorage.setItem('token', 'testtoken');

    expect(service.getAuthenticatedUserToken()).toEqual('testtoken');

  });

});
