import { Injectable } from '@angular/core';
import { CoreState } from '@app/core/store/models';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureRightsState } from '../store/models';
import { currentUserSelector, featuresRightsSelector } from '../store/security.selectors';
import { ConfigurationService } from '@app/core/services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RightService {

  constructor(
    private readonly store: Store<CoreState>,
    private readonly configService: ConfigurationService
    ) { }

  private testRights(userRights: string[], featureRights: string[]): boolean {
    return featureRights.every(x => userRights.some(r => r === x));
  }

  private hasFeatureRight(feature: string, configuration: FeatureRightsState[], userRights?: string[]): boolean {
    const featureConfiguration = configuration?.find(f => f.name === feature);

    if (!featureConfiguration || !userRights) {
      return false;
    }

    return this.testRights(userRights, featureConfiguration.rights);
  }

  hasFeature(right: string): Observable<boolean> {
    return this.hasRights([right]);
  }

  hasRights(rights: string[]): Observable<boolean> {

    if (!this.configService.configuration.security.enabled) {
      return of(true);
    }

    return combineLatest([
      this.store.select(currentUserSelector),
      this.store.select(featuresRightsSelector)
    ]).pipe(
      map(results => ({ user: results[0], features: results[1] })),
      map(x => rights.every(r => this.hasFeatureRight(r, x.features, x.user?.rights))),
    );
  }
}
