import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlaceComponent } from './select-place.component';
import { SelectPlaceRoutingModule } from './select-place-routing.module';

@NgModule({
  declarations: [SelectPlaceComponent],
  imports: [CommonModule, SelectPlaceRoutingModule]
})
export class SelectPlaceModule {}
