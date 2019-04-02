import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecurityModule } from '@app/security/security.module';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { UserTestComponent } from './user-test/user-test.component';

@NgModule({
  declarations: [UserTestComponent, TestComponent],
  imports: [
    CommonModule,
    SharedModule,
    TestRoutingModule,
    AllMaterialModuleModule,
    SecurityModule.forChild([
      { feature: UserTestComponent.name, rights: [ 'admin' ] }
    ])
  ]
})
export class TestModule { }
