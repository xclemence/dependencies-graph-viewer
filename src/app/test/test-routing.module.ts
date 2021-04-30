import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRightsGuard } from '@app/security/guards';

import { PageNotFoundComponent } from './../shared/components/page-not-found/page-not-found.component';
import { TestComponent } from './test.component';
import { UserTestComponent } from './user-test/user-test.component';

const routes: Routes = [
  { path: '', component: TestComponent, children: [
    { path: 'user', component: UserTestComponent, canActivate: [ComponentRightsGuard] },
    { path: '**', component: PageNotFoundComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
