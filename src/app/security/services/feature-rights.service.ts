import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user';
import { LoggerService } from '@app/core/services';
import { securityStateSelector } from '@app/core/store/core.selectors';
import { CoreState } from '@app/core/store/models';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureRightsService {

  #location = new Map<string, string>();

  constructor(private store: Store<CoreState>, private loggerService: LoggerService) { }

  addLocation(key: string, component: any) {
    this.#location.set(key, component.constructor.name);
  }

  removeLocation(key: string) {
    this.#location.delete(key);
  }

  validateCurrentLocation(): boolean {
    return Array.from(this.#location.values()).every(x => this.validateComponentRight(x));
  }

  private testRights(userRights: string[], featureRights: string[]): boolean {
    return featureRights.every(x => userRights.some(r => r === x));
  }

  validateComponentRight(component: string): Observable<boolean> {

    return this.store.select(securityStateSelector).pipe(
      map(x => {
        const featureConfiguration = x.featuresConfiguration.find(f => f.name === component);

        if (!featureConfiguration) {
          return true;
        }
        this.testRights(x.currentUser.rights, featureConfiguration.rights)
      })
    );
  }
}
