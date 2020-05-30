import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AllMaterialModuleModule } from './all-material-module.module';
import { HeaderLinksComponent, HeaderUserComponent } from './components';
import { BusyComponent } from './components/busy/busy.component';
import { ForceGraphComponent } from './components/force-graph/force-graph.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    ForceGraphComponent,
    PageNotFoundComponent,
    BusyComponent,
    HeaderUserComponent,
    HeaderLinksComponent
  ],
  imports: [
    CommonModule,
    AllMaterialModuleModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    ForceGraphComponent,
    PageNotFoundComponent,
    BusyComponent,
    HeaderLinksComponent,
    HeaderUserComponent
  ]
})
export class SharedModule { }
