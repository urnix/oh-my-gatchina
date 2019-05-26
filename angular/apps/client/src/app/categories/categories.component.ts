import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+core/store/app.state';
import { getCategories } from './categories.selectors';
import { CategoriesLoadCollectionAction } from './+actions/loadCollection.action';

@Component({
  selector: 'angular-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  categories$ = this.store.pipe(select(getCategories));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new CategoriesLoadCollectionAction());
  }
}
