import { NgModule } from '@angular/core';
import { FeatureRightsConfig } from '@app/security/models';
import { SecurityModule } from '@app/security/security.module';

export const TestModuleRightsKey = 'TestModuleRights';

const config: FeatureRightsConfig[] = [
  { feature: TestModuleRightsKey, rights: [ 'test' ] }
];

@NgModule({
  imports: [SecurityModule.config(config)],
})
export class AppSecurityModule { }
