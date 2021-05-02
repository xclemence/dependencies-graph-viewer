import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { RightService } from '../services/right.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentRightsGuard implements CanActivate {

  constructor(
    private featureRightsService: RightService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {

    let componentName = '';
    if (next.component instanceof Type) {
      componentName = next.component.name;
    } else {
      componentName = next.component;
    }

    return this.featureRightsService.hasFeature(componentName).pipe(
      map(x => {
        if (!x) {
          return this.router.parseUrl('notfound');
        }

        return true;
      })
    );
  }
}
