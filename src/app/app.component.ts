import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderLink } from '@app/shared/components';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { TestModuleRightsKey } from './app-security.module';
import { errorStateSelector } from './core/store/core.selectors';
import { CoreState } from './core/store/models';
import { SecurityConfigurationService } from './security/services/security-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'DependenciesGraph';
  #storeSubscription: Subscription;

  links: Array<HeaderLink> = [
    { path : 'software', label: 'Software', roles: [ ] },
    { path : 'assembly', label: 'Assembly', roles: [ ] },
  ];

  constructor(
    private securityConfigurationService: SecurityConfigurationService,
    private store: Store<CoreState>,
    private snackBar: MatSnackBar) {
    const testModuleRights = securityConfigurationService.getRights(TestModuleRightsKey);

    this.links.push({ path: 'test', label: 'Test', roles: testModuleRights.rights});
  }

  ngOnInit(): void {
    this.#storeSubscription = this.store.pipe(
      select(errorStateSelector),
      filter(x => x.lastError),
      map(x => JSON.stringify(x.lastError))
    ).subscribe(x => this.snackBar.open(x, 'Close'));
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
  }
}
