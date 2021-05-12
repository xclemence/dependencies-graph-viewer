import { Injectable } from '@angular/core';
import { operationFailure } from '@app/core/store/actions';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { setCurrentUserAction } from '../store/actions';
import { RightMappingService } from './right-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityConfigurationService {

  constructor(
    private keycloak: KeycloakService,
    private store: Store,
    private rightsMapping: RightMappingService ) {}

  async configure(ssoRedirectUri: string): Promise<void> {
    if (!environment.security.enabled) {
      return;
    }

    try {
      await this.keycloak.init({
        config: {
          url: environment.security.server,
          realm: environment.security.realm,
          clientId: environment.security.clientId,
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: ssoRedirectUri,
          enableLogging: true,
        },
        loadUserProfileAtStartUp: true
      });

      console.log('test');
      if (await this.keycloak.isLoggedIn()) {
        this.store.dispatch(setCurrentUserAction({
          name: this.keycloak.getUsername(),
          rights: this.keycloak.getUserRoles().map(x => this.rightsMapping.getApplicationRight(x))
        }));
      }
    }
    catch (error: any) {
      environment.security.enabled = false;
      this.store.dispatch(operationFailure({error: `Error during security configuration: ${error}`, origin: undefined}));
    }

  }
}
