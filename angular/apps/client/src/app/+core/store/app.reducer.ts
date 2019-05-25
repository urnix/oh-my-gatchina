import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { storeLogger } from 'ngrx-store-logger';
import {
  LocalStorageSyncReducer,
  rehydrateFeatureState
} from '../../+shared/helpers/localStorageSyncState.helper';
import { environment } from '../../../environments/environment';
import { EnvironmentType } from '../../../environments/environment.interface';
import { AppState } from './app.state';
import { CoreState, CoreStateInitial } from './core.state';
import { FEATURE_NAME } from './feature-name';
import { BaseAction } from '../../+shared/helpers/state.helper';

export const CoreInitialStateRehydrated =
  rehydrateFeatureState<CoreState>(FEATURE_NAME) || CoreStateInitial;

export function CoreReducer(
  state = CoreInitialStateRehydrated,
  action: BaseAction<CoreState>
) {
  return action.feature === FEATURE_NAME && action.handler
    ? action.handler(state, action)
    : state;
}

export const AppReducers: ActionReducerMap<AppState> = {
  core: CoreReducer
};

export function AppStateLevelReducer(reducer) {
  return function(state, action) {
    // noinspection JSRedundantSwitchStatement
    switch (action.type) {
      // some global event handler here
      default:
        break;
    }
    return reducer(state, action);
  };
}

export function LoggerReducer(reducer): any {
  return storeLogger({ collapsed: true })(reducer);
}

// export function LogRocketReducer(reducer): any {
//   return createNgrxMiddleware(LogRocket)(reducer);
// }

const productionReducers = [
  AppStateLevelReducer,
  LocalStorageSyncReducer /*, LogRocketReducer*/
];
const developmentReducers = [
  LoggerReducer /*storeFreeze or similar meta reducers*/
];
const testReducers = [
  /*storeFreeze or similar meta reducers*/
];

export const AppMetaReducers: MetaReducer<AppState, Action>[] =
  environment.type === EnvironmentType.prod
    ? productionReducers
    : environment.type === EnvironmentType.dev
    ? [...productionReducers, ...developmentReducers]
    : [...productionReducers, ...testReducers]; // EnvironmentType.test
