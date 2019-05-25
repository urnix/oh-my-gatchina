import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';

import { CreateEventComponent, ConfirmDialogWithTextComponent } from './create-event.component';
import { CreateEventService } from './create-event.service';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatIconModule],
  declarations: [CreateEventComponent, ConfirmDialogWithTextComponent],
  entryComponents: [CreateEventComponent, ConfirmDialogWithTextComponent],
})
export class CreateEventModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CreateEventModule,
      providers: [CreateEventService],
    };
  }
}
