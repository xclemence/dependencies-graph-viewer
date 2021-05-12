import { Component, Input, OnInit } from '@angular/core';
import { CoreState } from '@app/core/store/models';
import { currentUserSelector } from '@app/security/store/security.selectors';
import { isNotNullOrUndefined } from '@app/shared/type-guards';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
export class HeaderLinksComponent implements OnInit {
  @Input() allLinks?: HeaderLink[];
  userLinks?: Observable<HeaderLink[]>;

  constructor(private readonly store: Store<CoreState>) { }

  ngOnInit(): void {
    this.updateUserLinks();
  }

  private updateUserLinks(): void {
    this.userLinks = this.store.select(currentUserSelector).pipe(
      map(x => x?.rights ?? []),
      map(x => this.allLinks?.filter(l => l.roles.length === 0 || l.roles.every(r => x.includes(r)))),
      filter(isNotNullOrUndefined),
    );
  }
}
