import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@app/shared/components';
import { LogonGuard } from './user-management/guards/logon.guard';

const routes: Routes = [
  {
    path: 'software',
    loadChildren: './software/software.module#SoftwareModule'
  },
  {
    path: 'assembly',
    loadChildren: './assembly/assembly.module#AssemblyModule'
  },
  {
    path: '',
    redirectTo: 'software',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [LogonGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
