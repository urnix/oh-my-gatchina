import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPlaceComponent } from './select-place.component';

const routes: Routes = [
  {
    path: '.',
    component: SelectPlaceComponent
    // children: [
    //   {
    //     path: 'select-place',
    //     loadChildren: './select-place/select-place.module#SelectPlaceModule',
    //   },
    // ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectPlaceRoutingModule {}
