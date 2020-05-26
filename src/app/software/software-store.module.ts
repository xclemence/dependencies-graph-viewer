import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SoftwareNameEffects } from './store/effects/software-name.effects';
import { SoftwareAssembliesEffects } from './store/effects/software-assemblies.effects';
import { softwareFeatureKey } from './store/software.selectors';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(softwareFeatureKey, reducers),
    EffectsModule.forFeature([SoftwareNameEffects, SoftwareAssembliesEffects])
  ],
})
export class SoftwareStoreModule { }
