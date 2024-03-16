import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

describe('Testing Error interceptor', () => {

  let httpMock: HttpTestingController;
  let interceptor: ErrorInterceptor;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        ErrorInterceptor
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  afterEach(() => {

    httpMock.verify();
  })


  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not change error label when error status not internal', () => {


    httpClient.get("/test").pipe(catchError(error => {
      expect(error).toEqual("Test")
      return of();
    })).subscribe();

    httpMock.expectOne("/test").flush("Test", { status: 400, statusText: "Bad request" });


  });

  it('should change error label when error status is internal', () => {

    httpClient.get("/test").pipe(catchError(error => {
      expect(error.message).toEqual("An error occured. Please try later")
      return of(error);
    })).subscribe();

    httpMock.expectOne("/test").flush("Test", { status: 500, statusText: "Error occured" });

  });

});
