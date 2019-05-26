import { CityEvent } from '@shared/models/cityEvent.interface';

export interface SelectPlaceState {
  events: CityEvent[];
  isLoading: boolean;
  loadError: Error;
}

export const SelectPlaceStateInitial = {
  events: [],
  isLoading: false,
  loadError: null,
};
