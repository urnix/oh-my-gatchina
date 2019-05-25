import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserSignedOutAction } from '../../../+core/store/actions/userSignedOut.action';
import { AppState } from '../../../+core/store/app.state';
import { getUser } from '../../../+core/store/selectors';

@Component({
  selector: 'fr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  user$ = this.store.pipe(select(getUser));

  constructor(private store: Store<AppState>) {}

  async signOut() {
    // if (await this.confirmDialogService.show('Are you sure you want to sign out?')) {
    this.store.dispatch(new UserSignedOutAction());
    // }
  }
}
