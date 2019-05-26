import {
  BaseAction,
  generateActionType
} from '../../+shared/helpers/state.helper';
import { setStateProperties } from '@shared/helpers/state/state.helper';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { unwrapCollectionSnapshotChanges } from '../../+shared/helpers/firestore.helper';
import { Store } from '@ngrx/store';
import { AppState } from '../../+core/store/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriesState } from '../categories.state';
import { CATEGORIES_FEATURE_NAME } from '../categories-feature-name';
import { CategoriesLoadCollectionActionError } from './loadFailed.action';
import { CategoriesLoadCollectionActionSuccessful } from './loadSuccessful.action';

const type = generateActionType(CATEGORIES_FEATURE_NAME, 'Load Collection');

export class CategoriesLoadCollectionAction
  implements BaseAction<CategoriesState> {
  feature = CATEGORIES_FEATURE_NAME;
  type = type;

  constructor() {}

  handler(state: CategoriesState, action: this): CategoriesState {
    console.log(`hand`);
    return setStateProperties(state, {
      isLoading: true,
      loadError: null
    });
  }
}

@Injectable()
export class CategoriesLoadCollectionActionEffect {
  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(type),
    switchMap(action => {
      console.log(`in 1`);
      return combineLatest(
        of(action)
        //this.store.pipe(select(getUserId))
      );
    }),
    map(([action]) => ({ action })),
    //userId
    switchMap(data =>
      this.db
        .collection('categories')
        .snapshotChanges()
        .pipe(
          map(unwrapCollectionSnapshotChanges),
          map(results => new CategoriesLoadCollectionActionSuccessful(results)),
          catchError(error =>
            of(new CategoriesLoadCollectionActionError(error))
          )
        )
    ),
    catchError(error => of(new CategoriesLoadCollectionActionError(error)))
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore
  ) {}
}
