import { rehydrateFeatureState } from '../+shared/helpers/localStorageSyncState.helper';
import { SelectPlaceState, SelectPlaceStateInitial } from './select-place.state';
import { BaseAction } from '../+shared/helpers/state.helper';
import { SELECT_PLACE_FEATURE_NAME } from './select-place-feature-name';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SelectPlaceLoadCollectionActionEffect } from './+actions/loadCollection.action';

const initialState = rehydrateFeatureState<SelectPlaceState>(SELECT_PLACE_FEATURE_NAME) || SelectPlaceStateInitial;

export function SelectPlaceReducer(state = initialState, action: BaseAction<SelectPlaceState>) {
  return action.feature === SELECT_PLACE_FEATURE_NAME && action.handler ? action.handler(state, action) : state;
}

@NgModule({
  imports: [
    StoreModule.forFeature(SELECT_PLACE_FEATURE_NAME, SelectPlaceReducer),
    EffectsModule.forFeature([
      SelectPlaceLoadCollectionActionEffect,
    ]),
  ],
})
export class SelectPlaceStoreModule {}
