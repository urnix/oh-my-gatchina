import { getFirebaseAdmin } from './configureFirebase';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';

const fbAdmin = getFirebaseAdmin();

export function getFirestore() {
  return fbAdmin.firestore();
}

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

export function unwrapCollectionSnapshot<T>(snapshot: QuerySnapshot): T[] {
  return snapshot.docs.map(s => unwrapDocSnapshot(s));
}

export function unwrapDocSnapshot<T>(snapshot: DocumentSnapshot, deleteUnitTestFunctionName?: boolean): T {
  const data = unwrapDateFields(snapshot.data());
  if (deleteUnitTestFunctionName && data && data.unitTestFunctionName) {
    delete data.unitTestFunctionName;
  }
  return { id: snapshot.id, ...data } as T;
}

export function unwrapDocSnapshotIfExists<T>(
  snapshot: DocumentSnapshot,
  deleteUnitTestFunctionName?: boolean,
): null | T {
  const data = unwrapDateFields(snapshot.data());
  if (!data) {
    return null;
  }
  if (deleteUnitTestFunctionName && data && data.unitTestFunctionName) {
    delete data.unitTestFunctionName;
  }
  return { id: snapshot.id, ...data } as T;
}

