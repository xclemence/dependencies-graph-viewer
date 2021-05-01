import { NgModule } from '@angular/core';
import { SecurityModule } from '@app/security/security.module';

import { UserTestComponent } from './user-test/user-test.component';

const config = {
  features: [
    { feature: UserTestComponent.name, rights: [ 'test-user' ] }
  ]
};

@NgModule({
  imports: [SecurityModule.config(config)],
})
export class TestSecurityModule { }
