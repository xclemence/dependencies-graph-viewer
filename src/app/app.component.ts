import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { VersionService } from './core/services/version.service';
import { errorStateSelector } from './core/store/core.selectors';
import { CoreState } from './core/store/models';
import { HeaderLink } from './shared/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'DependenciesGraph';
  #storeSubscription: Subscription;

  canLogon = environment.security.enabled;

  links: Array<HeaderLink> = [
    { path : 'software', label: 'Software', roles: [ ] },
    { path : 'assembly', label: 'Assembly', roles: [ ] },
    { path : 'test', label: 'Test', roles: [ 'test' ] },
  ];

  get version(): string {
    return this.versionService.version;
  }

  constructor(
    private store: Store<CoreState>,
    private snackBar: MatSnackBar,
    private versionService: VersionService,
    ) {
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
