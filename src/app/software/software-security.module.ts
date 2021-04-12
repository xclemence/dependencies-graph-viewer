import { NgModule } from '@angular/core';
import { FeatureRightsConfig } from '@app/security/models';
import { SecurityModule } from '@app/security/security.module';

const config: FeatureRightsConfig[] = [
  { feature: 'admin-software-item', rights: [ 'admin' ] }
];

@NgModule({
  imports: [SecurityModule.config(config)],
  // exports: [SecurityModule]
})
export class SoftwareSecurityModule { }
