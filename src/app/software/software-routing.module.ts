import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoftwareComponent } from './software.component';


const routes: Routes = [
  { path: ':id', component: SoftwareComponent },
  { path: '', component: SoftwareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
