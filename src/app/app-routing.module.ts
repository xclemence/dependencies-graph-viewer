import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedGuard, LogonGuard } from '@app/security/guards';
import { PageNotFoundComponent } from '@app/shared/components';

const routes: Routes = [
  {
    path: 'software',
    loadChildren: () => import('./software/software.module').then(m => m.SoftwareModule)
  },
  {
    path: 'assembly',
    loadChildren: () => import('./assembly/assembly.module').then(m => m.AssemblyModule),
    canActivate: [ ConnectedGuard ]
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule),
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
