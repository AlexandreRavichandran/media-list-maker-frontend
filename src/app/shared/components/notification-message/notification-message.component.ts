import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification/notification';
import { NotificationTypeConstant } from '../../constants/notification-type.constant';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'mlm-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent {

  @Input()
  notification!: Notification;

  constructor(private notificationService: NotificationService) { }

  getBackgroundStyleByNotificationType(): string {

    return NotificationTypeConstant.getColorByType(this.notification.type);

  }

  deleteNotification(): void {
    this.notificationService.clearNotification();
  }
}
