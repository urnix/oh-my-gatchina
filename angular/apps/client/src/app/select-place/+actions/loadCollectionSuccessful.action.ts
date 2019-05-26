import { BaseAction, generateActionType } from '../../+shared/helpers/state.helper';
import { SelectPlaceState } from '../select-place.state';
import { SELECT_PLACE_FEATURE_NAME } from '../select-place-feature-name';
import { setStateProperties } from '@shared/helpers/state/state.helper';
import { CityEvent } from '@shared/models/cityEvent.interface';

const type = generateActionType(SELECT_PLACE_FEATURE_NAME, 'Load Collection Successful');

export class SelectPlaceLoadCollectionActionSuccessful implements BaseAction<SelectPlaceState> {
  feature = SELECT_PLACE_FEATURE_NAME;
  type = type;

  constructor(public payload: CityEvent[]) {}

  handler(state: SelectPlaceState, action: this): SelectPlaceState {
    return setStateProperties(state, {
      isLoading: false,
      events: action.payload,
    })
  }
}
