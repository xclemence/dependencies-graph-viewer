import { Injectable } from '@angular/core';
import { LoggerService } from '@app/core/services';
import { currentUserSelector, featuresRightsSelector, securityStateSelector } from '@app/core/store/core.selectors';
import { CoreState, FeatureRigthsState } from '@app/core/store/models';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RightService {

  constructor(private store: Store<CoreState>, private loggerService: LoggerService) { }

  private testRights(userRights: string[], featureRights: string[]): boolean {
    return featureRights.every(x => userRights.some(r => r === x));
  }

  private hasComponentRight(component: string, configuration: FeatureRigthsState[], userRights: string[]): boolean {
    const featureConfiguration = configuration?.find(f => f.name === component);

    if (!featureConfiguration || !userRights) {
      return false;
    }

    return this.testRights(userRights, featureConfiguration.rights);
  }

  hasFeature(right: string): Observable<boolean> {
    return this.hasRights([right]);
  }

  hasRights(rights: string[]): Observable<boolean> {

    if (!environment.security.enabled) {
      return of(true);
    }

    return combineLatest([
        this.store.select(currentUserSelector),
        this.store.select(featuresRightsSelector)
      ]).pipe(
        map(results => ({user: results[0], features: results[1]})),
        map(x =>  rights.every(r => this.hasComponentRight(r, x.features, x.user?.rights))),
    );
  }
}
