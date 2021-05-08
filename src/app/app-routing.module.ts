import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/shared/components';
import { AuthGuard } from './security/guards/auth.guard';
import { NoRightComponent } from './shared/components/no-right/no-right.component';

const routes: Routes = [
  {
    path: 'software',
    loadChildren: () => import('./software/software.module').then(m => m.SoftwareModule)
  },
  {
    path: 'assembly',
    loadChildren: () => import('./assembly/assembly.module').then(m => m.AssemblyModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule),
    canLoad: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'software',
    pathMatch: 'full'
  },
  { path: 'no-right', component: NoRightComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
