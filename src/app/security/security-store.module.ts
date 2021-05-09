import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { securityReducer } from './store/reducers/security.reducer';
import { securityFeatureKey } from './store/security.selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(securityFeatureKey, securityReducer),
  ],
})
export class SecurityStoreModule { }
