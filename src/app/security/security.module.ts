import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { SecureOutletDirective } from './directives/secure-outlet.directive';
import { FeatureRightsConfig, } from './models';
import { FeatureSecurityToken, SecurityRegistrationService } from './services/security-registration.service';

@NgModule({
  declarations: [SecureOutletDirective,],
  imports: [
    CommonModule,
    AllMaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    SecureOutletDirective
  ]
})
export class SecurityModule {
  static config(featuresConfig: FeatureRightsConfig[]): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityRegistrationService,
        { provide: FeatureSecurityToken, multi: true, useValue: featuresConfig },
      ]
    };
  }

  constructor(securityRegistrationService: SecurityRegistrationService) {
    securityRegistrationService.register();
  }
}
