import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Guid } from 'guid-typescript';

import { UrlService } from './url.service';
import { CoreState } from '@app/core/store/models';
import { Store } from '@ngrx/store';
import { addBusyIndicatorAction, removeBusyIndicatorAction } from '@app/core/store/actions/busy-indicator.actions';

@Injectable({
  providedIn: 'root'
})
export class RouterEventService {

  private _busyId: Guid;
  private _originUrl: string;

  private map = new Map<string, () => void>([
    [NavigationStart.name, () => this.proceedNavigationStart()],
    [NavigationEnd.name, () => this.startBusy()],
    [NavigationCancel.name, () => this.proceedNavigationCancel()],
    [NavigationError.name, () => this.stopBusy()]
  ]);

  constructor(private _router: Router, private store: Store<CoreState>, private _urlService: UrlService) {
    this._router.events.subscribe(x => {
      const action = this.map.get(x.constructor.name);

      if (action !== undefined) {
        action();
      }
    });
  }

  private startBusy() {
    this.store.dispatch(addBusyIndicatorAction({ key: 'Main'}));
  }

  private stopBusy() {
    this.store.dispatch(removeBusyIndicatorAction({ key: 'Main'}));
  }

  private proceedNavigationStart() {
    this._originUrl = this._urlService.getCurrentPath();
    this.startBusy();
  }

  private proceedNavigationCancel() {
    this.stopBusy();
    this._urlService.moveSegment(this._originUrl);
  }
}
