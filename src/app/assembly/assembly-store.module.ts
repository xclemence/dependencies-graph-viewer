import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { assemblyFeatureKey } from './store/assembly.selectors';
import { AssembliesEffects, AssemblyDepthEffects, AssemblyDepthMaxEffects } from './store/effects';
import { assemblyReducer } from './store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(assemblyFeatureKey, assemblyReducer),
    EffectsModule.forFeature([
      AssembliesEffects,
      AssemblyDepthEffects,
      AssemblyDepthMaxEffects
    ])
  ],
})
export class AssemblyStoreModule { }
