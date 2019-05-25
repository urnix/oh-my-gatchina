import { ClearingRolesSlugType } from '../values/clearingRoles.array';

export interface User {
  id?: string;
  email: string;
  displayName: string;
  jobTitle: null | string;
  phone: null | string;
  photoURL: null | string;
  hasClearingAccess: boolean;
  clearingRole: ClearingRolesSlugType;
  createdAt: Date;
}
