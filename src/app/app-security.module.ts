import { NgModule } from '@angular/core';
import { SecurityModule } from '@app/security/security.module';

export const TestModuleRightsKey = 'TestModuleRights';

const config = {
  features: [
    { feature: TestModuleRightsKey, rights: [ 'test' ] }
  ]
};

@NgModule({
  imports: [SecurityModule.forRoot('no-right', config)],
})
export class AppSecurityModule { }
