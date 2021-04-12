import { Inject, Injectable, InjectionToken } from '@angular/core';
import { addFeatureConfigurationAction } from '@app/core/store/actions';
import { Store } from '@ngrx/store';

import { FeatureRightsConfig } from '../models/SeccurityConfig';

export const FeatureSecurityToken = new InjectionToken<FeatureRightsConfig[]>('Configuration for compenents');

@Injectable()
export class SecurityRegistrationService {

  constructor(@Inject(FeatureSecurityToken) private featureConfig: FeatureRightsConfig[][],
    private store: Store) {
  }

  register() {
    for (const item of this.featureConfig.reduce((x, y) => x.concat(y))) {
      this.store.dispatch(addFeatureConfigurationAction({ feature: item.feature, rights: item.rights }))
    }
  }
}
