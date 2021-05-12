import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';

import { SecurityConfig } from '../models/security-config';
import { addFeatureConfigurationAction, setNoRightPathAction } from '../store/actions';

export const featureSecurityToken = new InjectionToken<SecurityConfig>('Configuration for components');
export const redirectSecurityToken = new InjectionToken<string>('redirect url if no right');

@Injectable({
  providedIn: 'root'
})
export class SecurityRegistrationService {

  constructor(
    @Inject(featureSecurityToken) private readonly config: SecurityConfig[],
    @Inject(redirectSecurityToken) private readonly redirectPath: string,
    private readonly store: Store,
    ) {
  }

  register(): void {

    this.store.dispatch(setNoRightPathAction({ path: this.redirectPath }));

    for (const item of this.config.map(x => x.features).reduce((x, y) => x.concat(y))) {
      this.store.dispatch(addFeatureConfigurationAction({ feature: item.feature, rights: item.rights }));
    }
  }
}
