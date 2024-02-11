import { Injectable } from '@angular/core';
import { Observable, Subject, take, timer } from 'rxjs';
import { Notification } from '../../models/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationSubject: Subject<Notification | undefined> = new Subject<Notification | undefined>();

  getNotifications(): Observable<Notification | undefined> {
    return this.notificationSubject.asObservable();
  }

  addNewNotification(message: string, type: number): void {

    if (message === "") {
      return;
    }

    const notification: Notification = {
      message: message,
      type: type
    }

    this.notificationSubject.next(notification);

    timer(3000).pipe(
      take(1)
    ).subscribe(() => {
      this.clearNotification();
    });

  }

  clearNotification(): void {
    this.notificationSubject.next(undefined);
  }

}
