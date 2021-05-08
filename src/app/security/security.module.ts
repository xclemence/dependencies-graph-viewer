import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { SecurityConfig, } from './models';
import { featureSecurityToken, redirectSecurityToken, SecurityRegistrationService } from './services/security-registration.service';

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
  static forChild(configuration: SecurityConfig): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityRegistrationService,
        { provide: featureSecurityToken, multi: true, useValue: configuration },
      ]
    };
  }

  static forRoot(redirectPath: string, configuration: SecurityConfig): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityRegistrationService,
        { provide: redirectSecurityToken, multi: false, useValue: redirectPath },
        { provide: featureSecurityToken, multi: true, useValue: configuration },
      ]
    };
  }

  constructor(securityRegistrationService: SecurityRegistrationService) {
    securityRegistrationService.register();
  }
}
