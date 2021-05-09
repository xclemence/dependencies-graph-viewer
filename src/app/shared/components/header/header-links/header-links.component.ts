import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CoreState } from '@app/core/store/models';
import { currentUserSelector } from '@app/security/store/security.selectors';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface HeaderLink {
  path: string;
  label: string;
  roles: string[];
}

@Component({
  selector: 'dgv-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.scss']
})
export class HeaderLinksComponent implements OnInit, OnDestroy {
  @Input() allLinks: HeaderLink[];
  userLinks: Observable<HeaderLink[]>;
  #storeSubscription: Subscription;

  constructor(private store: Store<CoreState>) { }

  ngOnInit(): void {
    this.updateUserLinks();
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
  }

  private updateUserLinks(): void {
    this.userLinks = this.store.select(currentUserSelector).pipe(
      map(x => x?.rights ?? []),
      map(x => this.allLinks?.filter(l => l.roles.length === 0 || l.roles.every(r => x.includes(r)))),
    );
  }
}
