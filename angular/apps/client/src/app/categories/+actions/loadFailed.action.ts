import {
  BaseAction,
  generateActionType
} from '../../+shared/helpers/state.helper';
import { SELECT_PLACE_FEATURE_NAME } from '../../select-place/select-place-feature-name';
import { setStateProperties } from '@shared/helpers/state/state.helper';
import { CATEGORIES_FEATURE_NAME } from '../categories-feature-name';
import { CategoriesState } from '../categories.state';

const type = generateActionType(
  CATEGORIES_FEATURE_NAME,
  'Load Collection Error'
);

export class CategoriesLoadCollectionActionError
  implements BaseAction<CategoriesState> {
  feature = SELECT_PLACE_FEATURE_NAME;
  type = type;

  constructor(public payload: Error) {}

  handler(state: CategoriesState, action: this): CategoriesState {
    return setStateProperties(state, {
      isLoading: false,
      loadError: action.payload
    });
  }
}
