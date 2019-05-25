import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { SelectPlaceModule } from './select-place/select-place.module';
import { AppRoutingModule } from './app-routing.module';
import { SignupModule } from './signup/signup.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './+core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({
      experimentalTabSynchronization: true,
    }),
    SelectPlaceModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    SignupModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  exports: [StoreModule, RouterModule],
  providers: [AngularFirestore],
  // providers: [{ provide: FirestoreSettingsToken, useValue: {} }]
})
export class AppModule {}
