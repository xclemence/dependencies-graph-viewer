import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private readonly keycloak: KeycloakService
  ) { }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    if (! await this.keycloak.isLoggedIn()) {
      const fullPath = segments.reduce((path, currentSegment) => `${path}/${currentSegment.path}`, '');

      await this.keycloak.login({
        redirectUri: `${window.location.origin}${fullPath}`,
      });

      return false;
    }

    return true;
  }

}

