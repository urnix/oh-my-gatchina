import {
  Action,
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction,
  Query,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

function unwrapDateFields(data) {
  for (const key of Object.keys(data || {})) {
    const value = data[key];
    if (value && typeof value.toDate === 'function') {
      data[key] = value.toDate();
    } else if (typeof value === 'object') {
      data[key] = unwrapDateFields(value);
    }
  }
  return data;
}

export const unwrapCollectionSnapshotChanges = (
  actions: DocumentChangeAction<any>[]
): any[] =>
  actions.map(action => {
    const data = unwrapDateFields(action.payload.doc.data());
    return { id: action.payload.doc.id, ...data };
  });

export const unwrapDocSnapshotChanges = (
  action: Action<QueryDocumentSnapshot<any>>
): any => {
  const data = unwrapDateFields(action.payload.data());
  return { id: action.payload.id, ...data };
};

export const firestoreQueryStringStartsWith = (
  query: Query | CollectionReference,
  field: string,
  value: string
): Query => {
  const strFrontCode = value.slice(0, value.length - 1);
  const strEndCode = value.slice(value.length - 1, value.length);

  const startCode = value;
  const endCode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

  return query.where(field, '>=', startCode).where(field, '<', endCode);
};

export const getFirestoreDoc = (
  db: AngularFirestore,
  path: string
): Promise<any> => {
  return db
    .doc(path)
    .snapshotChanges()
    .pipe(
      first(),
      map(unwrapDocSnapshotChanges)
    )
    .toPromise();
};
