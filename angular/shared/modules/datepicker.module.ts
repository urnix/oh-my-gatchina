import { Injectable, NgModule } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDatepickerModule,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material';

const DEFAULT_MONTH_NAMES = {
  long: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  short: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};

const DEFAULT_DAY_OF_WEEK_NAMES = {
  long: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

const DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return DEFAULT_DAY_OF_WEEK_NAMES[style];
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return DEFAULT_MONTH_NAMES[style];
  }

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDay();
      const dd = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return (
        dd +
        ' ' +
        this.getMonthNames('short')[month] +
        ' ' +
        year +
        ', ' +
        this.getDayOfWeekNames('short')[day]
      );
    } else {
      return date.toDateString();
    }
  }

  parse(value: any): Date | null {
    if (typeof value === 'string') {
      let parts;
      if (value.includes('.')) {
        parts = value.split('.');
      } else if (value.includes('/')) {
        parts = value.split('/');
      } else if (value.includes(' ')) {
        parts = value.split(' ');
      }
      if (parts) {
        const year = Number(parts[2]);
        const month = Number(parts[1]) - 1;
        const date = Number(parts[0]);
        return new Date(year, month, date);
      }
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class DatePickerModule {}
