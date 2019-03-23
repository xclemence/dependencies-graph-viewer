import { ForceGraphComponent } from './components/force-graph/force-graph.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMaterialModuleModule } from './all-material-module.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BusyComponent } from './components/busy/busy.component';
import { MainBusyComponent } from './components/busy/main-busy.component';
import { UserHeaderComponent } from './components/header/user-header/user-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ForceGraphComponent,
    PageNotFoundComponent,
    BusyComponent,
    MainBusyComponent,
    UserHeaderComponent
  ],
  imports: [
    CommonModule,
    AllMaterialModuleModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ForceGraphComponent,
    PageNotFoundComponent,
    BusyComponent,
    MainBusyComponent
  ]
})
export class SharedModule { }
