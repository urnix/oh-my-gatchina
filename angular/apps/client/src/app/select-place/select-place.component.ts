import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../services/script-loader';

declare let ymaps: any;

@Component({
  selector: 'angular-select-place',
  templateUrl: './select-place.component.html',
  styleUrls: ['./select-place.component.sass']
})
export class SelectPlaceComponent implements OnInit, OnDestroy {
  map;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {}

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

  mapClick(coords) {
    if (!this.map.balloon.isOpen()) {
      this.map.balloon.open(coords, {
        contentHeader: 'Событие!',
        contentBody: 'contentBody.html',
        contentFooter: '<sup>Щелкните еще раз для отмены</sup>'
      });
    } else {
      this.map.balloon.close();
    }
    this.addPlaceMark(coords);
  }
}
