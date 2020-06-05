import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { assemblyFeatureKey } from './store/assembly.selectors';
import { AssembliesEffects, AssemblyDepthEffects } from './store/effects';
import { assemblyReducer } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(assemblyFeatureKey, assemblyReducer),
    EffectsModule.forFeature([AssembliesEffects, AssemblyDepthEffects])
  ],
})
export class AssemblyStoreModule { }
