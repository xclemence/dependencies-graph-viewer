import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LogonComponent } from '../components/logon/logon.component';
import { UserSecurityService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate {

  constructor(public dialog: MatDialog, private userServie: UserSecurityService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (this.userServie.hasUser()) {
      return true;
    }

    const dialogRef = this.dialog.open(LogonComponent, {});
    return dialogRef.afterClosed();
  }
}
