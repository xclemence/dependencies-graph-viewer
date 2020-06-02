import { AssemblyStoreModule } from './assembly-store.module';
import { AssemblyRoutingModule } from './assembly-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssemblyListComponent } from './assembly-list/assembly-list.component';
import { SharedModule, AllMaterialModuleModule } from '@app/shared';
import { FormsModule } from '@angular/forms';
import { AssemblyDetailsComponent } from './assembly-details/assembly-details.component';

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
