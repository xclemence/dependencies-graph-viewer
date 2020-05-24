import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromSoftware from './store/software.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SoftwareNameEffects } from './store/effects/software-name.effects';
import { SoftwareAssembliesEffects } from './store/effects/software-assemblies.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromSoftware.softwareFeatureKey, fromSoftware.reducer),
    EffectsModule.forFeature([SoftwareNameEffects, SoftwareAssembliesEffects])
  ],
})
export class SoftwareStoreModule { }
