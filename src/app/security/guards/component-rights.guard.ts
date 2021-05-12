import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { RightService } from '../services/right.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CoreStoreModule } from '@app/core/core-store.module';
import { securityStateSelector } from '../store/security.selectors';

@Injectable({
  providedIn: 'root'
})
export class ComponentRightsGuard implements CanActivate {

  constructor(
    private featureRightsService: RightService,
    private store: Store<CoreStoreModule>,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {

    let componentName = '';
    if (next.component instanceof Type) {
      componentName = next.component.name.replace('"', '');
    } else {
      componentName = next.component ?? '';
    }

    return this.featureRightsService.hasFeature(componentName).pipe(
      switchMap(x => {
        if (!x) {
          return this.store.select(securityStateSelector).pipe(map(c =>  this.router.parseUrl(c.noRightPath)));
        }

        return of(true);
      }
     ));
  }
}
