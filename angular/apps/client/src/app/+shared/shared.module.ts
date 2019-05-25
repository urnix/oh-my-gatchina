import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerModule } from '../../../../../shared/modules/datepicker.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { NotImplementedService } from './not-implemented/not-implemented.service';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoggerService } from './services/logger.service';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionService } from './services/subscription.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatePickerModule
  ],
  declarations: [AutofocusDirective, ProfileComponent, TruncatePipe],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    AutofocusDirective,
    ProfileComponent,
    TruncatePipe,
    HttpClientModule,
    DatePickerModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [LoggerService, NotImplementedService, SubscriptionService]
    };
  }
}
