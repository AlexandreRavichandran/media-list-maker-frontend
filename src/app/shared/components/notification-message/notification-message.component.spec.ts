import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMessageComponent } from './notification-message.component';
import { NotificationService } from '../../services/notification/notification.service';

describe('Testing notification message component', () => {
  let component: NotificationMessageComponent;
  let fixture: ComponentFixture<NotificationMessageComponent>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {

    mockNotificationService = jasmine.createSpyObj('NotificationService', ['clearNotification']);

    await TestBed.configureTestingModule({
      declarations: [NotificationMessageComponent],
      providers: [{ provide: NotificationService, useValue: mockNotificationService }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMessageComponent);
    component = fixture.componentInstance;
    component.notification = {
      message: "Message",
      type: 1
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete notification', () => {

    component.deleteNotification();

    expect(mockNotificationService.clearNotification).toHaveBeenCalled();

  });

});
