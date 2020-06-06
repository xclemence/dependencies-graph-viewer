import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LoggerService } from '@app/core/services';

import { FeatureRightsConfig } from '../models/SeccurityConfig';
import { ModuleSecurityConfig } from './../models/SeccurityConfig';

export const FeatureSecurityToken = new InjectionToken<FeatureRightsConfig[]>('Configuration for compenents');
export const ModuleSecurityToken = new InjectionToken<ModuleSecurityConfig>('Configuration for security module');


@Injectable({
  providedIn: 'root'
})
export class SecurityConfigurationService {

  #featureConfig = new Array<FeatureRightsConfig>();

  get FeatureRights(): FeatureRightsConfig[] {
    this.logger.log(JSON.stringify(this.#featureConfig));
    return this.#featureConfig;
  }

  constructor(@Inject(ModuleSecurityToken) private moduleConfig: ModuleSecurityConfig,
              private logger: LoggerService) {}

  addFeatureRights(rights: FeatureRightsConfig[]) {
    this.#featureConfig.push(...rights);
  }

  getServer() {
    return this.moduleConfig.serverUrl;
  }

  getRights(configKey: string): FeatureRightsConfig  {
    return this.#featureConfig.filter(x => x.feature === configKey)[0];
  }
}
