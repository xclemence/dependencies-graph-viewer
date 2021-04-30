import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { currentUserSelector } from '@app/core/store/core.selectors';
import { CoreState } from '@app/core/store/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class HeaderLink {
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
  @Input() allLinks: Array<HeaderLink>;
  userLinks: Array<HeaderLink> = [];
  #serviceSubscription: Subscription;

  constructor(private store: Store<CoreState>) {
  }

  ngOnInit(): void {
    this.updateUserLinks();
  }

  ngOnDestroy(): void {
    this.#serviceSubscription?.unsubscribe();
  }

  private updateUserLinks(): void {
    this.store.select(currentUserSelector).pipe(
      map(x => x?.rights ?? [])
    ).subscribe(x => {
      this.userLinks = this.allLinks.filter(l => l.roles.length === 0 || l.roles.every(r => x.includes(r)));
    })
  }
}
