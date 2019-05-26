import { BaseFirestoreEntity } from './base.interface';

export interface User extends BaseFirestoreEntity {
  email?: string;
  displayName?: null | string;
  photoURL?: null | string;
  createdAt?: Date;
  categories: [];
}
