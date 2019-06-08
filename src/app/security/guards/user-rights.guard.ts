import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserSecurityService } from '@app/security/services';

import { FeatureRightsService } from '../services/feature-rights.service';

@Injectable({
  providedIn: 'root'
})
export class UserRightsGuard implements CanActivate {

  constructor(private _securityService: UserSecurityService, private _featureRightsService: FeatureRightsService,
    private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    const redirect = next.data['redirect'] as string;
    const rights = next.data['rights'] as string[];

    if (rights.every(x => this._securityService.hasRight(x))) {
      return true;
    }

    if (redirect === undefined) {
      return false;
    }

    return this._router.parseUrl(redirect);
  }
}
