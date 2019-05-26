import { Category } from '@shared/models/category.interface';

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  loadError: Error;
}

export const CategoriesStateInitial = {
  categories: [],
  isLoading: false,
  loadError: null
};
