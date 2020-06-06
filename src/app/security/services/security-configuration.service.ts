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

  private _featureConfig = new Array<FeatureRightsConfig>();

  get FeatureRights(): FeatureRightsConfig[] {
    this._logger.log(JSON.stringify(this._featureConfig));
    return this._featureConfig;
  }

  constructor(@Inject(ModuleSecurityToken) private _moduleConfig: ModuleSecurityConfig,
              private _logger: LoggerService) {}

  addFeatureRights(rigths: FeatureRightsConfig[]) {
    this._featureConfig.push(...rigths);
  }

  getServer() {
    return this._moduleConfig.serverUrl;
  }

  getRights(configKey: string): FeatureRightsConfig  {
    return this._featureConfig.filter(x => x.feature === configKey)[0];
  }
}
