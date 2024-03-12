import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationTypeConstant } from '../../constants/notification-type.constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {

      if (this.isErrorInternal(error.status)) {

        this.changeErrorIfInternal(error);

        this.notificationService.addNewNotification(error.message, NotificationTypeConstant.ERROR.type);

      }

      return throwError(() => error);

    }));
  }

  private changeErrorIfInternal(error: any) {

    if (this.isErrorInternal(error.status)) {
      error.message = "An error occured. Please try later";
    }

    return error;

  }

  private isErrorInternal(httpStatus: number): boolean {

    const firstNumber: number = parseInt(httpStatus.toString()[0]);

    return firstNumber === 5;
  }
}
