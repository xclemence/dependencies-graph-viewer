import { NgModule } from '@angular/core';
import { SecurityModule } from '@app/security/security.module';
import { removeAssemblyFeature, removeAssemblyRight } from './assembly-security-keys';

const config = {
  features:[
    { feature: removeAssemblyFeature, rights: [ removeAssemblyRight ] }
  ]
};

@NgModule({
  imports: [SecurityModule.config(config)],
})
export class AssemblySecurityModule { }
