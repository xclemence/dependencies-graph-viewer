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

  #originUrl?: string;

  private readonly map = new Map<string, () => void>([
    [NavigationStart.name, () => this.proceedNavigationStart()],
    [NavigationEnd.name, () => this.stopBusy()],
    [NavigationCancel.name, () => this.proceedNavigationCancel()],
    [NavigationError.name, () => this.stopBusy()]
  ]);

  constructor(
    private readonly router: Router,
    private readonly store: Store<CoreState>,
    private readonly urlService: UrlService) {

    this.router.events.subscribe(x => {

      const action = this.map.get(x.constructor.name);

      if (action !== undefined) {
        action();
      }
    });
  }

  private startBusy(): void {
    this.store.dispatch(addBusyIndicatorAction({ key: 'Main' }));
  }

  private stopBusy(): void {
    this.store.dispatch(removeBusyIndicatorAction({ key: 'Main' }));
  }

  private proceedNavigationStart(): void {
    this.#originUrl = this.urlService.getCurrentPath();
    this.startBusy();
  }

  private proceedNavigationCancel(): void {
    this.stopBusy();
    if (this.#originUrl) {
      this.urlService.moveSegment(this.#originUrl);
    }
  }
}
