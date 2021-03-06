// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { UserConfig } from '@shared/types/userConfig.interface';
// import { CollectionNames } from '@shared/values/collectionNames.map';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { of } from 'rxjs';
// import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
// import { unwrapCollectionSnapshotChanges } from '../../../+shared/helpers/firestore.helper';
// import { BaseAction, generateActionType } from '../../../+shared/helpers/state.helper';
// import { setStateProperties } from '@shared/helpers/state/state.helper';
// import { AppState } from '../app.state';
// import { CoreState } from '../core.state';
// import { FEATURE_NAME } from '../feature-name';
// import { getUser } from '../selectors';
// import { LoggerService } from '../../../+shared/services/logger.service';
// import { Permission } from '@shared/types/permission.interface';
// import { PermissionsSetCollectionAction } from './permissionsSetCollectionAction.action';
// import { ClientPaginationLimit } from '@shared/values/constants';
//
// const type = generateActionType(FEATURE_NAME, 'User - UserConfig loaded');
//
// export class UserConfigLoadedAction implements BaseAction<CoreState> {
//   feature = FEATURE_NAME;
//   type = type;
//
//   constructor(public payload: UserConfig) {}
//
//   handler(state: CoreState, action: this): CoreState {
//     return setStateProperties(state, { userConfig: action.payload });
//   }
// }
//
// @Injectable()
// export class UserConfigLoadedActionEffect {
//   @Effect()
//   watchPermissions$ = this.actions$.pipe(
//     ofType(type),
//     withLatestFrom(this.store, (action, state) => state),
//     switchMap((state: AppState) => {
//       const userId = getUser(state).id;
//       if (userId) {
//         return this.db
//           .collection<Permission>(CollectionNames.permissions, ref => {
//             return (
//               ref
//                 // .limit(ClientPaginationLimit)
//                 .where('userId', '==', getUser(state).id)
//             );
//           })
//           .snapshotChanges();
//       }
//       return of(null);
//     }),
//     filter(v => !!v),
//     map(unwrapCollectionSnapshotChanges),
//     map((items: Permission[]) => new PermissionsSetCollectionAction(items)),
//     catchError(error => {
//       this.logger.error('UserConfigLoadedActionEffect.watchPermissions$', error);
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
