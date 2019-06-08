import { Directive, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';

import { FeatureRightsService } from './../services/feature-rights.service';

@Directive({
  selector: '[appSecureOutlet]'
})
export class SecureOutletDirective implements OnDestroy {

  private _secureOutletId = Guid.create();

  private _activateSubscription: Subscription;
  private _deactivateSubscription: Subscription;

  constructor(featureRightservice: FeatureRightsService, routerOutlet: RouterOutlet) {
    this._activateSubscription = routerOutlet.activateEvents.subscribe((x: any) => {
      featureRightservice.addLocation(this._secureOutletId.toString(), x);
    });

    this._deactivateSubscription = routerOutlet.deactivateEvents.subscribe((x: any) => {
      featureRightservice.removeLocation(this._secureOutletId.toString());
    });
  }

  ngOnDestroy(): void {
    this._activateSubscription.unsubscribe();
    this._deactivateSubscription.unsubscribe();
  }
}
