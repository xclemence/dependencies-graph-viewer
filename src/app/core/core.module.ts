import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreStoreModule } from './core-store.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreStoreModule,
    GraphQLModule
  ],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
