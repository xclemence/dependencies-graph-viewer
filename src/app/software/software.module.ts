import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareComponent } from './software.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { SharedModule, AllMaterialModuleModule } from '@app/shared';
import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareReferencesComponent } from './software-references/software-references.component';
import { FormsModule } from '@angular/forms';
import { SoftwareStatisticsComponent } from './software-statistics/software-statistics.component';

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
    FormsModule
  ],
  exports: [
    SoftwareComponent
  ]
})
export class SoftwareModule { }
