import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../environments/environment';
import { CoreStoreModule } from './store/module';

// Be attentive: Function calls are not supported in decorators but 'BsDropdownModule' was called
// needed for fix bug with mobile safari https://github.com/firebase/firebase-js-sdk/issues/1670
const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const webkit = !!ua.match(/WebKit/i);
const angularFirestoreModule =
  iOS && webkit && !ua.match(/CriOS/i)
    ? [AngularFirestoreModule]
    : [
        AngularFirestoreModule.enablePersistence({
          experimentalTabSynchronization: true
        })
      ];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // CoreRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ...angularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreStoreModule
  ],
  declarations: [],
  exports: [StoreModule, RouterModule],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }]
})
export class CoreModule {}
