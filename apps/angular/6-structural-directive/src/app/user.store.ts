import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  readonly user$ = this.user.asObservable();

  changeToUser(user: User) {
    this.user.next(user);
  }
}
