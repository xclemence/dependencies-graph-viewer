import { NgModule } from '@angular/core';
import { SecurityModule } from '@app/security/security.module';

const config = {
  features: [
  ]
};

@NgModule({
  imports: [SecurityModule.forChild(config)],
})
export class SoftwareSecurityModule { }
