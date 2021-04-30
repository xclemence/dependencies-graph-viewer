import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { AssemblyRoutingModule } from './assembly-routing.module';
import { AssemblySecurityModule } from './assembly-security.module';
import { AssemblyStoreModule } from './assembly-store.module';
import { AssemblyDetailsComponent } from './components/assembly-details/assembly-details.component';
import { AssemblyListComponent } from './components/assembly-list/assembly-list.component';

@NgModule({
  declarations: [AssemblyListComponent, AssemblyDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AssemblyRoutingModule,
    AllMaterialModuleModule,
    FormsModule,
    AssemblyStoreModule,
    AssemblySecurityModule
  ]
})
export class AssemblyModule { }
