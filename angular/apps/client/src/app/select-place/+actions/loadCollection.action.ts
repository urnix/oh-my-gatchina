import { BaseAction, generateActionType } from '../../+shared/helpers/state.helper';
import { setStateProperties } from '@shared/helpers/state/state.helper';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SelectPlaceState } from '../select-place.state';
import { SELECT_PLACE_FEATURE_NAME } from '../select-place-feature-name';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { AppState } from '../../+core/store/app.state';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { SelectPlaceLoadCollectionActionError } from './loadCollectionError.action';
import { unwrapCollectionSnapshotChanges } from '../../+shared/helpers/firestore.helper';
import { SelectPlaceLoadCollectionActionSuccessful } from './loadCollectionSuccessful.action';

const type = generateActionType(SELECT_PLACE_FEATURE_NAME, 'Load Collection');

export class SelectPlaceLoadCollectionAction implements BaseAction<SelectPlaceState> {
  feature = SELECT_PLACE_FEATURE_NAME;
  type = type;

  constructor() {}

  handler(state: SelectPlaceState, action: this): SelectPlaceState {
    return setStateProperties(state, {
      isLoading: true,
      loadError: null,
    })
  }
}

@Injectable()
export class SelectPlaceLoadCollectionActionEffect {
  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(type),
    switchMap(action => combineLatest(of(action),
      //this.store.pipe(select(getUserId))
    )),
    map(([action,
           //userId
         ]) => ({ action })),
    switchMap(data => this.db.collection('events').snapshotChanges().pipe(
      map(unwrapCollectionSnapshotChanges),
      map(results => new SelectPlaceLoadCollectionActionSuccessful(results)),
      catchError(error => of(new SelectPlaceLoadCollectionActionError(error))),
    )),
    catchError(error => of(new SelectPlaceLoadCollectionActionError(error))),
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private db: AngularFirestore) {}
}
