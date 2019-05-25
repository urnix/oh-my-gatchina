import {
  Action,
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction,
  Query,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { convertToTimeZone } from 'date-fns-timezone';
import { DefaultTimezone } from '@shared/values/constants';

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

function unwrapInvoiceDateFields(data, timezone) {
  const timeZone = timezone || DefaultTimezone;
  for (const key of Object.keys(data || {})) {
    const value = data[key];
    if (value && typeof value.toDate === 'function') {
      if (key === 'invoiceDate') {
        data[key] = convertToTimeZone(value.toDate(), { timeZone });
      } else {
        data[key] = value.toDate();
      }
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

export const unwrapInvoiceSnapshotChanges = (
  action: Action<QueryDocumentSnapshot<any>>,
  timezone
): any => {
  const data = unwrapInvoiceDateFields(action.payload.data(), timezone);
  return { id: action.payload.id, ...data };
};

export const unwrapInvoiceCollectionSnapshotChanges = (
  actions: DocumentChangeAction<any>[],
  timezone
): any[] =>
  actions.map(action => {
    const data = unwrapInvoiceDateFields(action.payload.doc.data(), timezone);
    return { id: action.payload.doc.id, ...data };
  });

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
