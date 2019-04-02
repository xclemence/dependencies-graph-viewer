import { Directive, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { FeatureRightsService } from './../services/feature-rights.service';

@Directive({
  selector: '[appSecureOutlet]'
})
export class SecureOutletDirective implements OnDestroy {

  _subscription: Subscription;

  constructor(featureRightservice: FeatureRightsService, routerOutlet: RouterOutlet) {
    this._subscription = routerOutlet.activateEvents.subscribe((x: any) => {
      featureRightservice.currentComponent = x;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
