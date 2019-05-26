import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlaceComponent } from './select-place.component';
import { SelectPlaceRoutingModule } from './select-place-routing.module';
import { DynamicScriptLoaderService } from '../services/script-loader';
import { CreateEventService } from './create-event-dialog/src/create-event.service';
import { MatDialogModule } from '@angular/material';
import { CreateEventModule } from './create-event-dialog';
import { SelectPlaceStoreModule } from './select-place.state.module';

@NgModule({
  declarations: [SelectPlaceComponent],
  imports: [
    CommonModule,
    SelectPlaceRoutingModule,
    MatDialogModule,
    CreateEventModule,
    SelectPlaceStoreModule,
  ],
  providers: [DynamicScriptLoaderService, CreateEventService]
})
export class SelectPlaceModule {}
