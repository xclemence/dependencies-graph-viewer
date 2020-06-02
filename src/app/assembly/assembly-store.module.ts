import { assemblyFeatureKey } from './store/assembly.selectors';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { assemblyReducer } from './store/reducers';
import { AssembliesEffects, AssemblyDepthEffects } from './store/effects';

@NgModule({
  imports: [
    StoreModule.forFeature(assemblyFeatureKey, assemblyReducer),
    EffectsModule.forFeature([AssembliesEffects, AssemblyDepthEffects])
  ],
})
export class AssemblyStoreModule { }
