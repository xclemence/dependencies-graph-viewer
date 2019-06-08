import { NgModule } from '@angular/core';
import { FeatureRightsConfig } from '@app/security/models';
import { SecurityModule } from '@app/security/security.module';

export const TestModuleRightsKey = 'TestModuleRights';

const config: FeatureRightsConfig[] = [
  { feature: TestModuleRightsKey, rights: [ 'admin' ] }
];

@NgModule({
  imports: [SecurityModule.forRoot({serverUrl: 'http://'}, config)],
})
export class AppSecurityModule { }
