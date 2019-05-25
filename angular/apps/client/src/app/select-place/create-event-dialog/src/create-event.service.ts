import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateEventComponent } from './create-event.component';

@Injectable()
export class CreateEventService {
  constructor(public dialog: MatDialog) {}

  show(): Promise<boolean> {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      width: '330px'
    });
    return dialogRef
      .afterClosed()
      .toPromise()
      .then(result => result);
  }
}
