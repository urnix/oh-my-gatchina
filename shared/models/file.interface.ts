import { BaseFirestoreEntity } from './base.interface';

export interface StorageFile extends BaseFirestoreEntity {
  /**
   * Path to file on Cloud Storage
   */
  path: string;
  /**
   * Public URL for downloading on frontend
   */
  downloadURL: null | string;
  /**
   * File size in bytes. 1 mebibyte = 1024 kibibytes = 1048576 bytes
   */
  size: number;
  md5: string;
  mimeType: string;
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
  createdAt: Date;
  createdBy: string;
}

export interface CompanyAvatarFile extends StorageFile {
  sourceType: 'companyAvatar';
  meta: {
    width: number;
    height: number;
  };
}
