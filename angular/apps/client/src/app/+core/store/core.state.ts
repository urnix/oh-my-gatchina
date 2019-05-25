import { AuthState } from './types/authState.enum';
import { User } from '../../../../../../../shared/models/user.interface';

export interface ListState<T> {
  ids: string[];
  items: { [id: string]: T };
  isLoading: boolean;
  loadError: Error;
}

export const ListStateInitial: ListState<any> = {
  ids: [],
  items: {},
  isLoading: false,
  loadError: null
};

export class UserCustomFields {
  displayName: string;
}

export interface CoreState {
  authState: AuthState;
  authError?: string;
  emailActionMode?: string;
  emailActionCode?: string;
  emailActionEmail?: string;
  resendEmailDate?: Date;
  userCustomFields?: UserCustomFields;
  user: User;
  // userConfig: UserConfig;
  // permissions: ListState<Permission>;
  // organizations: ListState<Organization>;
  // locations: ListState<Location>;
}

export const CoreStateInitial: CoreState = {
  authState: AuthState.notAuthenticated,
  authError: null,
  user: null,
  userCustomFields: null
  // userConfig: null,
  // permissions: ListStateInitial,
  // organizations: ListStateInitial,
  // locations: ListStateInitial,
};
