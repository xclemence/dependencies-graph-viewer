import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SoftwareAssembliesEffects } from './store/effects/software-assemblies.effects';
import { SoftwareNameEffects } from './store/effects/software-name.effects';
import { reducers } from './store/reducers';
import { softwareFeatureKey } from './store/software.selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(softwareFeatureKey, reducers),
    EffectsModule.forFeature([SoftwareNameEffects, SoftwareAssembliesEffects])
  ],
})
export class SoftwareStoreModule { }
