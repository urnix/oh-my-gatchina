import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPlaceComponent } from './select-place/select-place.component';
import { SignupComponent } from './signup/signup.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'feed',
    component: FeedComponent
  },
  {
    path: 'select-place',
    component: SelectPlaceComponent
  },
  {
    path: '**',
    redirectTo: 'feed'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
