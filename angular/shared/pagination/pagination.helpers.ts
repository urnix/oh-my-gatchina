import { unwrapCollectionSnapshotChanges } from '../../apps/eatery/src/app/+shared/helpers/firestore.helper';
import { ClientPaginationLimit } from '@shared/values/constants';
import { setStateProperties } from '@shared/helpers/state/state.helper';

export const loadCollectionSuccessfulHandler = <T>(
  state: any,
  snapshots: any[],
  collectionUnwrapper?,
  listName?: string,
  paginationLimit?: number
) => {
  const collectionUnwrapUtil =
    collectionUnwrapper || unwrapCollectionSnapshotChanges;
  const documents = collectionUnwrapUtil(snapshots);
  const fieldName = listName || 'list';
  const limit = paginationLimit || ClientPaginationLimit;
  const pagination = { ...state[fieldName].pagination };
  const pointers = pagination.pointers;
  pagination.hasNextPage = snapshots.length === limit;

  const emptyLastPage = !snapshots.length && pagination.page > 1;
  if (pagination.page > pointers.length) {
    if (pagination.hasNextPage) {
      pagination.pointers = [
        ...pointers,
        snapshots[snapshots.length - 1].payload.doc
      ];
    } else if (emptyLastPage) {
      pagination.page = pointers.length;
    }
  } else if (pagination.page < pointers.length && pointers.length >= 2) {
    pagination.pointers = pointers.slice(0, pointers.length - 1);
  }
  const list = setStateProperties(state[fieldName], {
    ids: emptyLastPage ? state[fieldName].ids : documents.map(item => item.id),
    map: emptyLastPage
      ? state[fieldName].map
      : documents.reduce((items, item) => ({ ...items, [item.id]: item }), {}),
    pagination,
    isLoading: false,
    loadError: null
  });
  return setStateProperties(state, { [fieldName]: list });
};
