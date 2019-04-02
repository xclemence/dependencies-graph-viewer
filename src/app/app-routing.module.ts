import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedGuard, LogonGuard } from '@app/security/guards';
import { PageNotFoundComponent } from '@app/shared/components';

const routes: Routes = [
  {
    path: 'software',
    loadChildren: './software/software.module#SoftwareModule'
  },
  {
    path: 'assembly',
    loadChildren: './assembly/assembly.module#AssemblyModule',
    canActivate: [ ConnectedGuard ]
  },
  {
    path: 'test',
    loadChildren: './test/test.module#TestModule',
    // canActivate: [ ConnectedGuard ]
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
