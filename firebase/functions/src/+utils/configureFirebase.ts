import * as admin from 'firebase-admin';

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    let options = {};
    admin.initializeApp(options);
    admin.firestore().settings({});
  }
  return admin;
}

export async function releaseFirebaseAdmin() {
  await admin.app().delete();
}
