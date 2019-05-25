// import { BaseAction, generateActionType } from '../../../+shared/helpers/state.helper';
// import { setStateProperties } from '@shared/helpers/state/state.helper';
// import { CoreState } from '../core.state';
// import { FEATURE_NAME } from '../feature-name';
// import { Permission } from '@shared/types/permission.interface';
// import { AppState } from '../app.state';
// import { getUser } from '../selectors';
// import { CollectionNames } from '@shared/values/collectionNames.map';
// import { unwrapCollectionSnapshotChanges } from '../../../+shared/helpers/firestore.helper';
// import { Organization } from '@shared/types/organization.interface';
// import { OrganizationsSetCollectionAction } from './organizationsSetCollection.action';
// import { LoggerService } from '../../../+shared/services/logger.service';
// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { ClientPaginationLimit } from '@shared/values/constants';
// import { of } from 'rxjs';
//
// const type = generateActionType(FEATURE_NAME, 'Permissions - Set collection');
//
// export class PermissionsSetCollectionAction implements BaseAction<CoreState> {
//   feature = FEATURE_NAME;
//   type = type;
//
//   constructor(public payload: Permission[]) {}
//
//   handler(state: CoreState, action: this): CoreState {
//     const permissions = setStateProperties(state.permissions, {
//       ids: action.payload.map(item => item.id),
//       items: action.payload.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
//     });
//     return setStateProperties(state, { permissions });
//   }
// }
//
// @Injectable()
// export class PermissionsSetCollectionActionEffect {
//   @Effect()
//   watchOrganizations$ = this.actions$.pipe(
//     ofType(type),
//     withLatestFrom(this.store, (action, state) => state),
//     switchMap((state: AppState) => {
//       const userId = getUser(state).id;
//       if (userId) {
//         return this.db
//           .collection<Organization>(CollectionNames.organizations, ref => {
//             return (
//               ref
//                 // .limit(ClientPaginationLimit)
//                 .where('isDeleted', '==', false)
//                 .where('availableForUsers', 'array-contains', getUser(state).id)
//             );
//           })
//           .snapshotChanges();
//       }
//       return of(null);
//     }),
//     filter(v => !!v),
//     map(unwrapCollectionSnapshotChanges),
//     map((items: Organization[]) => new OrganizationsSetCollectionAction(items)),
//     catchError(error => {
//       this.logger.error('PermissionsSetCollectionActionEffect.watchOrganizations$', error);
//       return of(null);
//     }),
//   );
//
//   constructor(
//     private actions$: Actions,
//     private store: Store<AppState>,
//     private db: AngularFirestore,
//     private logger: LoggerService,
//   ) {}
// }
