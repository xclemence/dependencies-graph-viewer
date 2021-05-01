import { NgModule } from '@angular/core';
import { SecurityModule } from '@app/security/security.module';

const config = {
  features: [
  ]
};

@NgModule({
  imports: [SecurityModule.config(config)],
  // exports: [SecurityModule]
})
export class SoftwareSecurityModule { }
