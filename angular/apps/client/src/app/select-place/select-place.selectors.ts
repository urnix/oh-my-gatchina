import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SELECT_PLACE_FEATURE_NAME } from './select-place-feature-name';
import { SelectPlaceState } from './select-place.state';

export const getSelectPlaceState = createFeatureSelector<SelectPlaceState>(SELECT_PLACE_FEATURE_NAME);

export const getEvents = createSelector(
  getSelectPlaceState,
  state => state.events,
);
