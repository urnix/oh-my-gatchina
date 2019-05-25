import { BaseFirestoreEntity } from './base.interface';

export interface Company extends BaseFirestoreEntity {
  name: string;
  createdAt: Date;
  createdBy: string;
  timezone: string; // timezone name from moment.js
  isDeleted: boolean;
  ownerId: string;
  admins: string[]; //userIds
  users: string[]; //userIds
}
