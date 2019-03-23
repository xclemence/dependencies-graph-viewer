import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user';
import { Observable, of } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _userService: UserService ) { }

  logon(userName: string, password: string): Observable<boolean> {
    if (userName !== 'xce') {
      return of(false);
    }

    const user = new User({name: userName, roles: ['admin', 'super-user']});
    this._userService.user = user;
    localStorage.setItem('userToken', 'TokenForAuthen');
    return of(true);
  }

  logout() {
    this._userService.user = null;
    localStorage.removeItem('userToken');
  }
}
