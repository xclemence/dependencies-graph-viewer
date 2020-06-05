import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { AssemblyDetailsComponent } from './assembly-details/assembly-details.component';
import { AssemblyListComponent } from './assembly-list/assembly-list.component';
import { AssemblyRoutingModule } from './assembly-routing.module';
import { AssemblyStoreModule } from './assembly-store.module';

@NgModule({
  declarations: [AssemblyListComponent, AssemblyDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AssemblyRoutingModule,
    AllMaterialModuleModule,
    FormsModule,
    AssemblyStoreModule
  ],
  entryComponents: [
    AssemblyDetailsComponent
  ]
})
export class AssemblyModule { }
