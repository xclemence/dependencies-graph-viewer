import { NgModule } from '@angular/core';
import { FeatureRightsConfig } from '@app/security/models';
import { SecurityModule } from '@app/security/security.module';

import { UserTestComponent } from './user-test/user-test.component';

const config: FeatureRightsConfig[] = [
  { feature: UserTestComponent.name, rights: [ 'test' ] }
];

@NgModule({
  imports: [SecurityModule.config(config)],
})
export class TestSecurityModule { }
