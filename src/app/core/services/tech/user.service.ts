import { Injectable } from '@angular/core';
import { User } from '@app/Core/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userChanged: BehaviorSubject<User>;

  set user(value: User) {
    if (this._userChanged.value === value) {
      return;
    }

    this._userChanged.next(value);
  }

  get user(): User {
    return this._userChanged.value;
  }

  constructor() {
    this._userChanged = new BehaviorSubject<User>(null);
  }

  observe(): Observable<User> {
    return this._userChanged.asObservable();
  }

  observeRight(right: string): Observable<boolean> {
    return this.observe().pipe(
      map(x => this.hasRight(right)),
      distinctUntilChanged()
    );
  }

  hasRight(right: string) {
    if (!this.user) {
      return false;
    }

    return this.user.roles.some(x => x === right);
  }
}
