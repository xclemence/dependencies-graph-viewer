import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SoftwareMainComponent } from './software-main/software-main.component';

const routes: Routes = [
  { path: ':id', component: SoftwareMainComponent },
  { path: '', component: SoftwareMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
