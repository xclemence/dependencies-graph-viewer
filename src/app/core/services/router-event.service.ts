import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { addBusyIndicatorAction, removeBusyIndicatorAction } from '@app/core/store/actions/busy-indicator.actions';
import { CoreState } from '@app/core/store/models';
import { Store } from '@ngrx/store';

import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RouterEventService {

  #originUrl: string;

  private map = new Map<string, () => void>([
    [NavigationStart.name, () => this.proceedNavigationStart()],
    [NavigationEnd.name, () => this.startBusy()],
    [NavigationCancel.name, () => this.proceedNavigationCancel()],
    [NavigationError.name, () => this.stopBusy()]
  ]);

  constructor(private router: Router, private store: Store<CoreState>, private urlService: UrlService) {
    this.router.events.subscribe(x => {
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
    this.#originUrl = this.urlService.getCurrentPath();
    this.startBusy();
  }

  private proceedNavigationCancel() {
    this.stopBusy();
    this.urlService.moveSegment(this.#originUrl);
  }
}
