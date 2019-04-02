import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Guid } from 'guid-typescript';

import { BusyService } from './busy.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RouterEventService {

  private _busyId: Guid;
  private _originUrl: string;

  private map = new Map<string, () => void>([
    [NavigationStart.name, () => this.proceedNavigationStart()],
    [NavigationEnd.name, () => this._busyService.unbusy(this._busyId)],
    [NavigationCancel.name, () => this.proceedNavigationCancel()],
    [NavigationError.name, () => this._busyService.unbusy(this._busyId)],
  ]);

  constructor(private _router: Router, private _busyService: BusyService, private _urlService: UrlService) {
    this._router.events.subscribe(x => {
      const action = this.map.get(x.constructor.name);

      if (action !== undefined) {
        action();
      }
    });
  }

  private proceedNavigationStart() {
    this._originUrl = this._urlService.getCurrentPath();
    this._busyId = this._busyService.busy();
  }

  private proceedNavigationCancel() {
    this._busyService.unbusy(this._busyId);
    this._urlService.moveSegment(this._originUrl);
  }
}
