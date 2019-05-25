import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPlaceComponent } from './select-place/select-place.component';

const routes: Routes = [
  {
    path: 'select-place',
    component: SelectPlaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
