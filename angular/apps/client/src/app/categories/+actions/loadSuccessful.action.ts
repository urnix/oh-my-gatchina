import {
  BaseAction,
  generateActionType
} from '../../+shared/helpers/state.helper';
import { SELECT_PLACE_FEATURE_NAME } from '../../select-place/select-place-feature-name';
import { setStateProperties } from '@shared/helpers/state/state.helper';
import { CategoriesState } from '../categories.state';
import { CATEGORIES_FEATURE_NAME } from '../categories-feature-name';
import { Category } from '@shared/models/category.interface';

const type = generateActionType(
  SELECT_PLACE_FEATURE_NAME,
  'Load Collection Successful'
);

export class CategoriesLoadCollectionActionSuccessful
  implements BaseAction<CategoriesState> {
  feature = CATEGORIES_FEATURE_NAME;
  type = type;

  constructor(public payload: Category[]) {}

  handler(state: CategoriesState, action: this): CategoriesState {
    return setStateProperties(state, {
      isLoading: false,
      categories: action.payload
    });
  }
}
