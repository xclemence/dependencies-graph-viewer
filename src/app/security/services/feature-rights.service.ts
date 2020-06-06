import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user';
import { LoggerService } from '@app/core/services';
import { SecurityConfigurationService } from '@app/security/services/security-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureRightsService {

  #location = new Map<string, string>();

  constructor(private configurationService: SecurityConfigurationService, private loggerService: LoggerService) { }

  addLocation(key: string, component: any) {
    this.#location.set(key, component.constructor.name);
  }

  removeLocation(key: string) {
    this.#location.delete(key);
  }

  validateCurrentLocation(user: User): boolean {
    return Array.from(this.#location.values()).every(x => this.validateComponentRight(x, user));
  }

  validateComponentRight(component: string, user: User): boolean {
    const config = this.configurationService.FeatureRights;

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
