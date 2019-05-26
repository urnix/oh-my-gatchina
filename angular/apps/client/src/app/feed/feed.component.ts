import { Component, OnInit } from '@angular/core';
import { SelectPlaceLoadCollectionAction } from '../select-place/+actions/loadCollection.action';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+core/store/app.state';
import { getEvents } from '../select-place/select-place.selectors';
import { CityEvent } from '@shared/models/cityEvent.interface';
import { getUserId } from '../+core/store/selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'angular-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  events$ = this.store.pipe(select(getEvents));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new SelectPlaceLoadCollectionAction());
  }

  async addUserClick(event: CityEvent) {
    const userId = await this.store
      .pipe(
        select(getUserId),
        first()
      )
      .toPromise();
    if (event.users.indexOf(userId) >= 0) {
      return;
    }
    const users = [...event.users, userId];
  }
}
