import { Inject, Injectable, InjectionToken } from '@angular/core';
import { addFeatureConfigurationAction } from '@app/core/store/actions';
import { Store } from '@ngrx/store';

import { SecurityConfig } from '../models/seccurity-config';

export const FeatureSecurityToken = new InjectionToken<SecurityConfig>('Configuration for compenents');

@Injectable({
  providedIn: 'root'
})
export class SecurityRegistrationService {

  constructor(
    @Inject(FeatureSecurityToken) private config: SecurityConfig[],
    private store: Store,
    ) {
  }

  register() {
    for (const item of this.config.map(x => x.features).reduce((x, y) => x.concat(y))) {
      this.store.dispatch(addFeatureConfigurationAction({ feature: item.feature, rights: item.rights }));
    }
  }
}
