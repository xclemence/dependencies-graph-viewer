import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers/core.reducer';
import { BusyIndicatorEffects } from './store/effects/busy-indicator.effects';
import { coreFeatureKey } from './store/core.selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(coreFeatureKey, reducers),
    EffectsModule.forFeature([BusyIndicatorEffects]),
  ],
})
export class CoreStoreModule { }
