import { SoftwareStoreModule } from './software-store.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { SoftwareListComponent } from './software-list/software-list.component';
import { SoftwareReferencesComponent } from './software-references/software-references.component';
import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareSecurityModule } from './software-security.module';
import { SoftwareStatisticsComponent } from './software-statistics/software-statistics.component';
import { SoftwareComponent } from './software.component';

@NgModule({
  declarations: [
    SoftwareComponent,
    SoftwareListComponent,
    SoftwareReferencesComponent,
    SoftwareStatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SoftwareRoutingModule,
    AllMaterialModuleModule,
    FormsModule,
    SoftwareSecurityModule,
    SoftwareStoreModule
  ],
  exports: [
    SoftwareComponent
  ]
})
export class SoftwareModule { }
