import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CATEGORIES_FEATURE_NAME } from './categories-feature-name';
import { CategoriesState } from './categories.state';

export const getCategoriesState = createFeatureSelector<CategoriesState>(
  CATEGORIES_FEATURE_NAME
);

export const getCategories = createSelector(
  getCategoriesState,
  state => state.categories
);
