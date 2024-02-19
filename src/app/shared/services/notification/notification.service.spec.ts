import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { Notification } from '../../models/notification/notification';
import { NotificationTypeConstant } from '../../constants/notification-type.constant';

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

    const notification: Notification = {
      message: "Message 1",
      type: NotificationTypeConstant.SUCCESS.type
    };

    service.addNewNotification(notification.message, notification.type);

    service.notificationSubject.asObservable().subscribe(notification => {
      expect(notification).toEqual(notification);
    });

  });

  it('should clear notification subject', () => {

    const notification: Notification = {
      message: "Message 1",
      type: NotificationTypeConstant.SUCCESS.type
    };

    service.addNewNotification(notification.message, notification.type);

    service.clearNotification();

    service.notificationSubject.asObservable().subscribe(notification => {
      expect(notification).toBeUndefined();
    });

  });

  it('should not add notification if message is empty', () => {

    service.addNewNotification("", NotificationTypeConstant.SUCCESS.type);

    service.notificationSubject.asObservable().subscribe(notification => {
      expect(notification).toBeUndefined();
    });

  });

});
