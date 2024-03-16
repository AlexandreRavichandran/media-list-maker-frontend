import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { Notification } from '../../models/notification/notification';
import { NotificationTypeConstant } from '../../constants/notification-type.constant';
import { lastValueFrom, take } from 'rxjs';

describe('Testing notification service', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new notification with type and message', () => {

    spyOn(service.notificationSubject, 'next');

    const notification: Notification = {
      message: "Message 1",
      type: NotificationTypeConstant.SUCCESS.type
    };

    service.addNewNotification(notification.message, notification.type);

    expect(service.notificationSubject.next).toHaveBeenCalled();

  });

  it('should clear notification subject', async () => {


    const notification: Notification = {
      message: "Message 1",
      type: NotificationTypeConstant.SUCCESS.type
    };

    service.addNewNotification(notification.message, notification.type);

    service.clearNotification();

    const emittedNotification = await lastValueFrom(service.notificationSubject.pipe(take(1)));

    expect(emittedNotification).toBeUndefined();

  });

  it('should not add notification if message is empty', () => {

    spyOn(service.notificationSubject, 'next')

    service.addNewNotification("", NotificationTypeConstant.SUCCESS.type);

    expect(service.notificationSubject.next).not.toHaveBeenCalled();

  });

});
