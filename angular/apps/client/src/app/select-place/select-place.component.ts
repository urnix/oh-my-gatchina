import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DynamicScriptLoaderService } from '../services/script-loader';
import { CreateEventService } from './create-event-dialog/src/create-event.service';

declare let ymaps: any;

@Component({
  selector: 'angular-select-place',
  templateUrl: './select-place.component.html',
  styleUrls: ['./select-place.component.sass']
})
export class SelectPlaceComponent implements OnInit, OnDestroy {
  map;

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private createEventService: CreateEventService,
    private db: AngularFirestore
  ) {}

  async ngOnInit() {
    await this.loadScripts();
  }

  ngOnDestroy(): void {
    this.map.destroy();
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
        center: [55.751574, 37.573856],
        zoom: 9
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

  addPlaceMark(coords) {
    const placemark = new ymaps.Placemark(
      coords,
      {
        hintContent: 'Событие',
        balloonContent: 'Метка события'
      },
      {
        iconLayout: 'default#image'
      }
    );
    this.map.geoObjects.add(placemark);
  }

  async mapClick(coords) {
    const eventData: any = await this.createEventService.show();
    if (!eventData || !eventData.result) {
      return;
    }
    const event = {
      name: eventData.name,
      description: eventData.description,
      coords
    };
    const id = this.db.createId();
    await this.db.doc(`events/${id}`).set(event);
    // if (!this.map.balloon.isOpen()) {
    //   this.map.balloon.open(coords, {
    //     contentHeader: 'Событие!',
    //     // contentBody: 'contentBody.html',
    //     contentFooter: '<sup>Щелкните еще раз для отмены</sup>',
    //     balloonLayout: createBaloonLayout(ymaps),
    //   });
    // } else {
    //   this.map.balloon.close();
    // }
    // this.addPlaceMark(coords);
  }
}
