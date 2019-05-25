// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { Location } from '@shared/types/location.interface';
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
// import { LocationsListSetCollectionAction } from './locationsListSetCollection.action';
// import { LocationsListLoadCollectionFailedAction } from './locationsLoadCollectionFailed.action';
// import { ClientPaginationLimit } from '@shared/values/constants';
//
// const type = generateActionType(FEATURE_NAME, 'Organizations -  Load data for active one');
//
// export class OrganizationsLoadDataAction implements BaseAction<CoreState> {
//   feature = FEATURE_NAME;
//   type = type;
//
//   constructor(public payload: string) {}
//
//   handler(state: CoreState): CoreState {
//     const locations = setStateProperties(state.locations, {
//       isLoading: true,
//       loadError: null,
//     });
//     return setStateProperties(state, { locations });
//   }
// }
//
// @Injectable()
// export class OrganizationsLoadDataForActiveOneActionEffect {
//   @Effect()
//   watchLocations$ = this.actions$.pipe(
//     ofType(type),
//     withLatestFrom(this.store, (action, state) => ({ action, state })),
//     switchMap((data: { action: OrganizationsLoadDataAction; state: AppState }) => {
//       const { action, state } = data;
//       if (action.payload) {
//         return this.db
//           .collection<Location>(`${CollectionNames.locations}`, ref =>
//             ref
//               // .limit(ClientPaginationLimit)
//               .where('isDeleted', '==', false)
//               .where('availableForUsers', 'array-contains', getUser(state).id),
//           )
//           .snapshotChanges();
//       }
//       return of(null);
//     }),
//     filter(v => !!v),
//     map(unwrapCollectionSnapshotChanges),
//     map((items: Location[]) => new LocationsListSetCollectionAction(items)),
//     catchError(error => of(new LocationsListLoadCollectionFailedAction(error))),
//   );
//
//   constructor(private actions$: Actions, private store: Store<AppState>, private db: AngularFirestore) {}
// }
