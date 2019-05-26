import { rehydrateFeatureState } from '../+shared/helpers/localStorageSyncState.helper';
import { BaseAction } from '../+shared/helpers/state.helper';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CATEGORIES_PLACE_FEATURE_NAME } from './categories-feature-name';
import { CategoriesState, CategoriesStateInitial } from './categories.state';

const initialState =
  rehydrateFeatureState<CategoriesState>(CATEGORIES_PLACE_FEATURE_NAME) ||
  CategoriesStateInitial;

export function CategoriesReducer(
  state = initialState,
  action: BaseAction<CategoriesState>
) {
  return action.feature === CATEGORIES_PLACE_FEATURE_NAME && action.handler
    ? action.handler(state, action)
    : state;
}

@NgModule({
  imports: [
    StoreModule.forFeature(CATEGORIES_PLACE_FEATURE_NAME, CategoriesReducer),
    EffectsModule.forFeature([])
  ]
})
export class CategoriesStoreModule {}
