import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlaceComponent } from './select-place.component';
import { SelectPlaceRoutingModule } from './select-place-routing.module';
import { DynamicScriptLoaderService } from '../services/script-loader';
import { CreateEventService } from './create-event-dialog/src/create-event.service';

@NgModule({
  declarations: [SelectPlaceComponent],
  imports: [CommonModule, SelectPlaceRoutingModule],
  providers: [DynamicScriptLoaderService, CreateEventService]
})
export class SelectPlaceModule {}
