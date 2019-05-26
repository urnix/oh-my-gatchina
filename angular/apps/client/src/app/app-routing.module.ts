import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPlaceComponent } from './select-place/select-place.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'select-place',
    component: SelectPlaceComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: 'select-place'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
