import { Directive, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';

import { FeatureRightsService } from './../services/feature-rights.service';

@Directive({
  selector: '[appSecureOutlet]'
})
export class SecureOutletDirective implements OnDestroy {

  #secureOutletId = Guid.create();

  #activateSubscription: Subscription;
  #deactivateSubscription: Subscription;

  constructor(featureRightservice: FeatureRightsService, routerOutlet: RouterOutlet) {
    this.#activateSubscription = routerOutlet.activateEvents.subscribe((x: any) => {
      featureRightservice.addLocation(this.#secureOutletId.toString(), x);
    });

    this.#deactivateSubscription = routerOutlet.deactivateEvents.subscribe((x: any) => {
      featureRightservice.removeLocation(this.#secureOutletId.toString());
    });
  }

  ngOnDestroy(): void {
    this.#activateSubscription.unsubscribe();
    this.#deactivateSubscription.unsubscribe();
  }
}
