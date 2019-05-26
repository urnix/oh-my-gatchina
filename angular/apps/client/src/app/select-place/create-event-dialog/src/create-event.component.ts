import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { getCategories } from '../../../categories/categories.selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../+core/store/app.state';
import { CategoriesLoadCollectionAction } from '../../../categories/+actions/loadCollection.action';

@Component({
  selector: 'angular-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEventComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private store: Store<AppState>
  ) {}

  description: string;
  name: string;
  categoryId: string;

  categories$ = this.store.pipe(select(getCategories));

  minDate = new Date();

  ngOnInit(): void {
    this.store.dispatch(new CategoriesLoadCollectionAction());
  }

  ok() {
    this.dialogRef.close({
      result: true,
      description: this.description,
      name: this.name,
      categoryId: this.categoryId
    });
  }

  onDescriptionChanged(text: string): void {
    this.description = text;
  }

  onNameChanged(text: string): void {
    this.name = text;
  }

  onCategoryChanged(categoryId) {
    console.log(categoryId);
    this.categoryId = categoryId;
  }
}
