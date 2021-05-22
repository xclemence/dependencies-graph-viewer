import { Injectable } from '@angular/core';
import { LoggerService } from '@app/core/services';
import { ConfigurationService } from '@app/core/services/configuration.service';
import { operationFailure } from '@app/core/store/actions';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { setCurrentUserAction } from '../store/actions';
import { RightMappingService } from './right-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityConfigurationService {

  constructor(
      private readonly keycloak: KeycloakService,
      private readonly store: Store,
      private readonly rightsMapping: RightMappingService,
      private readonly logger: LoggerService,
      private readonly configService: ConfigurationService) {}

  async configure(ssoRedirectUri: string): Promise<void> {
    const config = this.configService.configuration;

    if (!config.security.enabled) {
      return;
    }

    try {
      await this.keycloak.init({
        config: {
          url: config.security.server,
          realm: config.security.realm,
          clientId: config.security.clientId,
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: ssoRedirectUri,
          enableLogging: true,
        },
        loadUserProfileAtStartUp: true
      });

      if (await this.keycloak.isLoggedIn()) {
        this.store.dispatch(setCurrentUserAction({
          name: this.keycloak.getUsername(),
          rights: this.keycloak.getUserRoles().map(x => this.rightsMapping.getApplicationRight(x))
        }));
      }
    }
    catch (error: any) {
      this.logger.error(error);
      this.configService.configuration.security.enabled = false;
      this.store.dispatch(operationFailure({error: `Error during security configuration: ${error}`, origin: undefined}));
    }

  }
}
