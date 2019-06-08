import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/models/user';
import { Observable, of } from 'rxjs';

import { FeatureRightsService } from './feature-rights.service';
import { UserSecurityService } from './user-security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _userService: UserSecurityService,
              private _featureRigthsService: FeatureRightsService,
              private _router: Router) { }

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

    this.ensureCurrentLocation();
  }

  private ensureCurrentLocation() {
    if (!this._featureRigthsService.validateCurrentLocation(null)) {
      this._router.navigateByUrl('/');
    }
  }
}
