import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface PaginationState {
  page: number;
  pointers: QueryDocumentSnapshot<Object>[];
  hasNextPage: boolean;
}

export const paginationStateInitial: PaginationState = {
  page: 1,
  pointers: [],
  hasNextPage: true
};

export interface StateWithPagination {
  pagination: PaginationState;
}
