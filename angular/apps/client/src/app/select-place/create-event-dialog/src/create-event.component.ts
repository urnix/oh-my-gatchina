import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'angular-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEventComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateEventComponent>
  ) {}

  description: string;
  name: string;

  ok() {
    this.dialogRef.close({
      result: true,
      description: this.description,
      name: this.name
    });
  }

  onDescriptionChanged(text: string): void {
    this.description = text;
  }

  onNameChanged(text: string): void {
    this.name = text;
  }
}
