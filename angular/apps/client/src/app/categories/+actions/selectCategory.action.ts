import {
  BaseAction,
  generateActionType
} from '../../+shared/helpers/state.helper';
import { CATEGORIES_FEATURE_NAME } from '../categories-feature-name';
import { CategoriesState } from '../categories.state';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../+core/store/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '@shared/models/category.interface';
import { getUser } from '../../+core/store/selectors';

const type = generateActionType(CATEGORIES_FEATURE_NAME, 'Select Category');

export class CategoriesSelectAction implements BaseAction<CategoriesState> {
  feature = CATEGORIES_FEATURE_NAME;
  type = type;

  constructor(public payload: Category) {}

  handler(state: CategoriesState, action: this): CategoriesState {
    return state;
  }
}

@Injectable()
export class CategoriesSelectActionEffect {
  @Effect({ dispatch: false })
  loadCollection$ = this.actions$.pipe(
    ofType(type),
    switchMap(action =>
      combineLatest(of(action), this.store.pipe(select(getUser)))
    ),
    map(([action, user]) => ({ action, user })),
    switchMap(async data => {
      // @ts-ignore
      const categories = [...data.user.categories, data.action.payload];
      await this.db.doc(`users/${data.user.id}`).update({ categories });
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore
  ) {}
}
