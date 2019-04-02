import { Inject, Injectable } from '@angular/core';

import { FeatureRightsConfig } from '../models';
import { FeatureSecurityToken, SecurityConfigurationService } from './security-configuration.service';

@Injectable()
export class SecurityRegistrationService {

  constructor(@Inject(FeatureSecurityToken) private _featureConfig: FeatureRightsConfig[][],
              private _securityConfigService: SecurityConfigurationService) {
  }

  register() {
    this._securityConfigService.addFeatureRights(this._featureConfig.reduce((x, y) => x.concat(y)));

  }
}
