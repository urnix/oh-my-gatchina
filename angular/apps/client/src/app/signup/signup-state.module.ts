import { UserSignUpActionEffect } from '../+core/store/actions/userSignUp.action';
import { rehydrateFeatureState } from '../+shared/helpers/localStorageSyncState.helper';
import { SIGNUP_STATE_FEATURE_NAME } from './feature-name';
import { SignupState, SignupStateInitial } from './signup.state';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BaseAction } from '../+shared/helpers/state.helper';

const initialState =
  rehydrateFeatureState<SignupState>(SIGNUP_STATE_FEATURE_NAME) ||
  SignupStateInitial;

export function InvoicesReducer(
  state = initialState,
  action: BaseAction<SignupState>
) {
  return action.feature === SIGNUP_STATE_FEATURE_NAME && action.handler
    ? action.handler(state, action)
    : state;
}

@NgModule({
  imports: [
    StoreModule.forFeature(SIGNUP_STATE_FEATURE_NAME, InvoicesReducer),
    EffectsModule.forFeature([UserSignUpActionEffect])
  ]
})
export class SignupStateModule {}
