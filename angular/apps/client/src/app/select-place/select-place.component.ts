import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DynamicScriptLoaderService } from '../services/script-loader';
import { CreateEventService } from './create-event-dialog/src/create-event.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+core/store/app.state';
import { SelectPlaceLoadCollectionAction } from './+actions/loadCollection.action';
import { getEvents } from './select-place.selectors';
import { Subscription } from 'rxjs';
import { CityEvent } from '@shared/models/cityEvent.interface';
import { getUserId } from '../+core/store/selectors';
import { first } from 'rxjs/operators';

declare let ymaps: any;

@Component({
  selector: 'angular-select-place',
  templateUrl: './select-place.component.html',
  styleUrls: ['./select-place.component.sass']
})
export class SelectPlaceComponent implements OnInit, OnDestroy {
  map;

  events$ = this.store.pipe(select(getEvents));

  sub = new Subscription();

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private createEventService: CreateEventService,
    private db: AngularFirestore,
    private store: Store<AppState>
  ) {}

  async ngOnInit() {
    await this.loadScripts();
    this.store.dispatch(new SelectPlaceLoadCollectionAction());
    this.sub.add(this.events$.subscribe(events => this.addEventsMarks(events)));
  }

  ngOnDestroy(): void {
    this.map.destroy();
    this.sub.unsubscribe();
  }

  async loadScripts() {
    await this.dynamicScriptLoader.load('ymaps');
    await this.initMap();
  }

  async initMap() {
    await ymaps.ready();
    this.map = new ymaps.Map(
      'map',
      {
        center: [59.561353, 30.11224],
        zoom: 13
      },
      {
        searchControlProvider: 'yandex#search'
      }
    );
    this.map.events.add('click', e => {
      const coords = e.get('coords');
      this.mapClick(coords);
    });
  }

  addEventsMarks(events) {
    events.forEach((event: CityEvent) => this.addPlaceMark(event));
  }

  addPlaceMark(event: CityEvent) {
    const placemark = new ymaps.Placemark(
      event.coords,
      {
        hintContent: event.name,
        balloonContent: event.description
      },
      {
        iconLayout: 'default#image'
      }
    );
    this.map.geoObjects.add(placemark);
  }

  async mapClick(coords) {
    this.map.balloon.close();
    const eventData: any = await this.createEventService.show();
    if (
      !eventData ||
      !eventData.result ||
      !eventData.categoryId ||
      !eventData.name
    ) {
      return;
    }
    const userId = await this.store
      .pipe(
        select(getUserId),
        first()
      )
      .toPromise();

    const event = {
      name: eventData.name,
      description: eventData.description,
      categoryId: eventData.categoryId,
      coords,
      users: [userId]
    };
    const id = this.db.createId();
    await this.db.doc(`events/${id}`).set(event);
  }
}
