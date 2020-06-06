import { Inject, Injectable } from '@angular/core';

import { FeatureRightsConfig } from '../models';
import { FeatureSecurityToken, SecurityConfigurationService } from './security-configuration.service';

@Injectable()
export class SecurityRegistrationService {

  constructor(@Inject(FeatureSecurityToken) private featureConfig: FeatureRightsConfig[][],
              private securityConfigService: SecurityConfigurationService) {
  }

  register() {
    this.securityConfigService.addFeatureRights(this.featureConfig.reduce((x, y) => x.concat(y)));

  }
}
