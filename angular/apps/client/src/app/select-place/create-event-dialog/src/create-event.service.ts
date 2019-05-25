import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateEventComponent, ConfirmDialogWithTextComponent } from './create-event.component';

@Injectable()
export class CreateEventService {
  constructor(public dialog: MatDialog) {}

  show(title = 'Are you sure?', info?, infoWarn?): Promise<boolean> {
    const data: ConfirmDialogPromptOptions = { title, type: 'confirm' };
    if (info) {
      data.info = info;
    }
    if (infoWarn) {
      data.infoWarn = infoWarn;
    }
    const dialogRef = this.dialog.open(CreateEventComponent, {
      width: '330px',
      data,
    });
    return dialogRef
      .afterClosed()
      .toPromise()
      .then(result => !!result);
  }

  async prompt(data: ConfirmDialogPromptOptions): Promise<{ result: boolean; text: string }> {
    data.type = 'prompt';
    const dialogRef = this.dialog.open(ConfirmDialogWithTextComponent, {
      width: '330px',
      data,
    });
    return dialogRef
      .afterClosed()
      .toPromise()
      .then(result => {
        return result;
      });
  }
}

export interface ConfirmDialogPromptOptions {
  title: string;
  type?: 'confirm' | 'prompt';
  isAnswerRequired?: boolean;
  placeholder?: string;
  info?: string;
  infoWarn?: string;
}
