import { BaseAction, generateActionType } from '../../+shared/helpers/state.helper';
import { SelectPlaceState } from '../select-place.state';
import { SELECT_PLACE_FEATURE_NAME } from '../select-place-feature-name';
import { setStateProperties } from '@shared/helpers/state/state.helper';

const type = generateActionType(SELECT_PLACE_FEATURE_NAME, 'Load Collection Error');
export class SelectPlaceLoadCollectionActionError implements BaseAction<SelectPlaceState> {
  feature = SELECT_PLACE_FEATURE_NAME;
  type = type;

  constructor(public payload: Error) {}

  handler(state: SelectPlaceState, action: this): SelectPlaceState {
    return setStateProperties(state, {
      isLoading: false,
      loadError: action.payload,
    })
  }
}
