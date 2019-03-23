import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogonComponent } from './components/logon/logon.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule, AllMaterialModuleModule } from '@app/shared';

@NgModule({
  declarations: [LogonComponent],
  imports: [
    CommonModule,
    AllMaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  entryComponents: [
    LogonComponent
  ]
})
export class UserManagementModule { }
