import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user';
import { SecurityConfigurationService } from '@app/security/services/security-configuration.service';

import { LoggerService } from './../../core/services/tech/logger.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureRightsService {

  private _currentComponentName: string;

  set currentComponent(component: any) {
    this._currentComponentName = component.constructor.name;
    this._loggerService.log(this._currentComponentName);
  }

  constructor(private _configurationService: SecurityConfigurationService, private _loggerService: LoggerService) { }

  checkCurrentComponentRight(user: User): boolean {
    const config = this._configurationService.FeatureRights;

    const componentFeature = config.find(x => x.feature === this._currentComponentName);

    this._loggerService.log(`componentFeature ${JSON.stringify(componentFeature)}`);
    if (!componentFeature) {
      return true;
    }

    if (user === null) {
      return false;
    }

    return componentFeature.rights.every(x => user.roles.some(r => r === x));
  }
}
