import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SubscriptionService {
  public unsubscribeComponent$ = new Subject<void>();
  public unsubscribe$ = this.unsubscribeComponent$.asObservable();
}
