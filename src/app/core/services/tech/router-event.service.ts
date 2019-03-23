import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { BusyService } from './busy.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RouterEventService {

  private busyId: any;
  private _originUrl: string;

  private map = new Map<string, () => void>([
    [NavigationStart.name, () => this.proceedNavigationStart()],
    [NavigationEnd.name, () => this._busyService.unbusy(this.busyId)],
    [NavigationCancel.name, () => this.proceedNavigationCancel()],
    [NavigationError.name, () => this._busyService.unbusy(this.busyId)],
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
    this.busyId = this._busyService.busy();
  }

  private proceedNavigationCancel() {
    this._busyService.unbusy(this.busyId);
    this._urlService.moveSegment(this._originUrl);
  }
}
