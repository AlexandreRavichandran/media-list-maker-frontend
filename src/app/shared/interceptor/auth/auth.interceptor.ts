import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string | null = sessionStorage.getItem('token');

    if (!!token) {

      const headers: HttpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'

      })

      const customRequest: HttpRequest<unknown> = request.clone({ headers });

      return next.handle(customRequest);
    }

    return next.handle(request);

  }
}
