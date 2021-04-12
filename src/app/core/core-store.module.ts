import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { coreFeatureKey } from './store/core.selectors';
import { BusyIndicatorEffects } from './store/effects/busy-indicator.effects';
import { reducers } from './store/reducers/core.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(coreFeatureKey, reducers),
    EffectsModule.forFeature([BusyIndicatorEffects ]),
  ],
})
export class CoreStoreModule { }
