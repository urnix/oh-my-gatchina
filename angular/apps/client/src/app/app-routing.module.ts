import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPlaceComponent } from './select-place/select-place.component';
import { SignupComponent } from './signup/signup.component';
import { FeedComponent } from './feed/feed.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'feed',
    component: FeedComponent
  },
  {
    path: 'events',
    component: SelectPlaceComponent
  },
  {
    path: '**',
    redirectTo: 'sign-up'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
