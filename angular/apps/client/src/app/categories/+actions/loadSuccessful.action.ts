import {
  BaseAction,
  generateActionType
} from '../../+shared/helpers/state.helper';
import { setStateProperties } from '@shared/helpers/state/state.helper';
import { CategoriesState } from '../categories.state';
import { CATEGORIES_FEATURE_NAME } from '../categories-feature-name';
import { Category } from '@shared/models/category.interface';

const type = generateActionType(
  CATEGORIES_FEATURE_NAME,
  'Load Collection Successful'
);

export class CategoriesLoadCollectionActionSuccessful
  implements BaseAction<CategoriesState> {
  feature = CATEGORIES_FEATURE_NAME;
  type = type;

  constructor(public payload: Category[]) {}

  handler(state: CategoriesState, action: this): CategoriesState {
    console.log(` action.payload: ${JSON.stringify(action.payload)}`);
    return setStateProperties(state, {
      isLoading: false,
      categories: action.payload
    });
  }
}
