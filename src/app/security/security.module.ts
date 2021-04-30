import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { FeatureRightsConfig, SecurityConfig, } from './models';
import { FeatureSecurityToken, SecurityRegistrationService } from './services/security-registration.service';

@NgModule({
  imports: [
    CommonModule,
    AllMaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class SecurityModule {
  static config(configuration: SecurityConfig): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityRegistrationService,
        { provide: FeatureSecurityToken, multi: true, useValue: configuration },
      ]
    };
  }

  constructor(securityRegistrationService: SecurityRegistrationService) {
    console.log()
    securityRegistrationService.register();
  }
}
