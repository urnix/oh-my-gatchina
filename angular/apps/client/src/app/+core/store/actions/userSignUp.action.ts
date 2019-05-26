import { CoreState, UserCustomFields } from '../core.state';
import { FEATURE_NAME } from '../feature-name';
import { AuthState } from '../types/authState.enum';
// noinspection TypeScriptPreferShortImport
import { setStateProperties } from '../../../../../../../../shared/helpers/state/state.helper';
import {
  BaseAction,
  generateActionType
} from '../../../+shared/helpers/state.helper';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const type = generateActionType(FEATURE_NAME, 'User - Sign up');

export class UserSignUpAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: UserCustomFields) {}

  handler(state: CoreState, action: this): CoreState {
    return setStateProperties(state, {
      authState: AuthState.authorized,
      authError: null,
      userCustomFields: action.payload
    });
  }
}

@Injectable()
export class UserSignUpActionEffect {
  @Effect({ dispatch: false })
  redirect$ = this.actions$.pipe(
    ofType(type),
    tap(async () => await this.router.navigate(['/select-place']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
