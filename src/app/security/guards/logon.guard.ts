import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UrlService } from '@app/core/services/tech';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogonComponent } from '../components/logon/logon.component';

@Injectable({
  providedIn: 'root'
})
export class LogonGuard implements CanActivate {

  constructor(public dialog: MatDialog, private _router: Router, private _urlService: UrlService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (next.url.length === 1 && next.url[0].path === 'logon') {
      const currentRoutePath = this._urlService.getCurrentPath();
      const shouldReturnToHome = currentRoutePath === '/logon';

      const dialogRef = this.dialog.open(LogonComponent, {});

      const openSubscription = dialogRef.afterOpened().subscribe(() => {
        openSubscription.unsubscribe();
        this._urlService.moveSegment('/logon');
      });

      return dialogRef.afterClosed().pipe(
        map(x => shouldReturnToHome ? this._router.parseUrl('/') : false)
      );
    }

    return true;
  }
}
