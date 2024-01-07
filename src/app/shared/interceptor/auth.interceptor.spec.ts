import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('Testing Auth interceptor', () => {

  let httpMock: HttpTestingController;
  let interceptor: AuthInterceptor;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthInterceptor
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  afterEach(() => {

    httpMock.verify();
    sessionStorage.clear();
  })

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add token in request when token exists', () => {
    sessionStorage.setItem('token', 'testtoken');
    httpClient.get('test').subscribe();

    const request = httpMock.expectOne('test');

    expect(request.request.headers.get('Authorization')).toEqual('Bearer testtoken');

  });

  it('should not add token in request if there is no token in storage', () => {

    httpClient.get('test').subscribe();

    const request = httpMock.expectOne('test');

    expect(request.request.headers.get('Authorization')).toBeNull();

  });

});
