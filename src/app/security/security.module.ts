import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { LogonComponent } from './components/logon/logon.component';
import { SecureOutletDirective } from './directives/secure-outlet.directive';
import { FeatureRightsConfig, ModuleSecurityConfig } from './models';
import { FeatureSecurityToken, ModuleSecurityToken } from './services/security-configuration.service';
import { SecurityRegistrationService } from './services/security-registration.service';

@NgModule({
  declarations: [LogonComponent, SecureOutletDirective],
  imports: [
    CommonModule,
    AllMaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  entryComponents: [
    LogonComponent
  ],
  exports: [
    SecureOutletDirective
  ]
})
export class SecurityModule {
  static forRoot(moduleConfig: ModuleSecurityConfig, featuresConfig: FeatureRightsConfig[]): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityRegistrationService,
        { provide: ModuleSecurityToken, useValue: moduleConfig },
        { provide: FeatureSecurityToken, multi: true, useValue: featuresConfig },
      ]
    };
  }

  static forChild(featuresConfig: FeatureRightsConfig[]): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityRegistrationService,
        { provide: FeatureSecurityToken, multi: true, useValue: featuresConfig },
      ]};
  }

  constructor(securityRegistrationService: SecurityRegistrationService) {
    securityRegistrationService.register();
  }
}
