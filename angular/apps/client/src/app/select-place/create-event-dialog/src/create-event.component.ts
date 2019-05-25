import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'angular-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CreateEventComponent>) {}

  ok() {
    this.dialogRef.close(true);
  }

  onAnswerTextChanged(answer: string): void {}

  isAnswerFilled(): boolean {
    return true;
  }

  getType(): string {
    return this.data.type;
  }
}

@Component({
  selector: 'fr-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogWithTextComponent extends CreateEventComponent {
  textAreaValue: string;

  ok() {
    if (this.data.isAnswerRequired && !this.textAreaValue) {
      return;
    }
    this.dialogRef.close({ result: true, text: this.textAreaValue });
  }

  onAnswerTextChanged(answer: string): void {
    this.textAreaValue = answer;
  }

  isAnswerFilled(): boolean {
    return !!this.textAreaValue;
  }
}
