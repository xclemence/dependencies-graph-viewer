import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user';
import { LoggerService } from '@app/core/services';
import { SecurityConfigurationService } from '@app/security/services/security-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureRightsService {

  private _location = new Map<string, string>();

  constructor(private _configurationService: SecurityConfigurationService, private _loggerService: LoggerService) { }

  addLocation(key: string, component: any) {
    this._location.set(key, component.constructor.name);
  }

  removeLocation(key: string) {
    this._location.delete(key);
  }

  validateCurrentLocation(user: User): boolean {
    return Array.from(this._location.values()).every(x => this.validateComponentRight(x, user));
  }

  validateComponentRight(component: string, user: User): boolean {
    const config = this._configurationService.FeatureRights;

    const componentFeature = config.find(x => x.feature === component);

    if (!componentFeature) {
      return true;
    }

    if (user === null) {
      return false;
    }

    return componentFeature.rights.every(x => user.roles.some(r => r === x));
  }
}
