import { first } from 'rxjs/operators';
import { User } from '@shared/types/user.interface';
import { getUser } from '../apps/eatery/src/app/+core/store/selectors';
import { select } from '@ngrx/store';

export function getCurrentUser(store): Promise<User> {
  return store
    .pipe(
      select(getUser),
      first()
    )
    .toPromise();
}

export function useSelector(store, selector): Promise<any> {
  return store
    .pipe(
      select(selector),
      first()
    )
    .toPromise();
}
