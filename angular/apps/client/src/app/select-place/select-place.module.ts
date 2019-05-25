import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlaceComponent } from './select-place.component';
import { SelectPlaceRoutingModule } from './select-place-routing.module';
import { DynamicScriptLoaderService } from '../services/script-loader';

@NgModule({
  declarations: [SelectPlaceComponent],
  imports: [CommonModule, SelectPlaceRoutingModule],
  providers: [DynamicScriptLoaderService]
})
export class SelectPlaceModule {}
