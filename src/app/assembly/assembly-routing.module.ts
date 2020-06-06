import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssemblyListComponent } from './assembly-list/assembly-list.component';

const routes: Routes = [
  { path: '', component: AssemblyListComponent },
  { path: ':id', component: AssemblyListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssemblyRoutingModule { }
