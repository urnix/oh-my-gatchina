import { BaseFirestoreEntity } from './base.interface';
import { NotificationTypesSlugType } from '../values/notificationTypes.map';
import { NotificationStatusSlugType } from '../values/notificationStatuses.map';
import { NotificationErrorSlugType } from '../values/notificationError.map';

export interface NotificationQueueItem extends BaseFirestoreEntity {
  type: NotificationTypesSlugType;
  createdAt: Date;
  /**
   *  ID of related Source item
   */
  sourceId: string;
  /**
   * Type of related Source item
   */
  sourceType: string;
  /**
   * any additional info based on sourceType
   */
  meta: { [key: string]: any };
  /**
   * By default it's null. But it becomes actual datetime as soon as some script started working on it.
   */
  processingStartedAt: null | Date;
  /**
   * By default it's null. But it becomes actual datetime as soon as some script completed working with it.
   */
  processingEndedAt: null | Date;
  status: NotificationStatusSlugType;
  error: null | NotificationErrorSlugType;
}

export interface NotificationQueueEmailItem extends NotificationQueueItem {
  type: 'email';
  body: {
    from: string;
    to: string;
    subject: string;
    html: string;
  };
}

export interface NotificationQueueSmsItem extends NotificationQueueItem {
  type: 'sms';
  body: {
    to: string;
    from: string;
    body: string;
  };
}

export interface NotificationQueuePushItem extends NotificationQueueItem {
  type: 'push';
  body: {
    to: string;
    body: string;
  };
}

export interface NotificationQueueWelcomeUserEmailItem extends NotificationQueueEmailItem {
  sourceType: 'welcomeUserEmail';
  meta: {
    userId: string;
  };
}
