import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesStoreModule } from './categories.state.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, CategoriesStoreModule],
  providers: []
})
export class CategoriesModule {}
