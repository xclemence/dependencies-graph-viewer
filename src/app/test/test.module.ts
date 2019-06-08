import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { TestRoutingModule } from './test-routing.module';
import { TestSecurityModule } from './test-security.module';
import { TestComponent } from './test.component';
import { UserTestComponent } from './user-test/user-test.component';

@NgModule({
  declarations: [UserTestComponent, TestComponent],
  imports: [
    CommonModule,
    SharedModule,
    TestRoutingModule,
    AllMaterialModuleModule,
    TestSecurityModule,
  ]
})
export class TestModule { }
