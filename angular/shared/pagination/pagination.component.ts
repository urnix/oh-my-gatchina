import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { PaginationState } from './pagination.state';

@Component({
  selector: 'fr-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input()
  pagination: PaginationState;
  @Output()
  changed = new EventEmitter<any>();

  loadPage(direction: string) {
    this.changed.emit(direction);
  }
}
