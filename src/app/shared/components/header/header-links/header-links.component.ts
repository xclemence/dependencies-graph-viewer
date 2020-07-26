import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserSecurityService } from '@app/security/services';
import { Subscription } from 'rxjs';

export class HeaderLink {
  path: string;
  label: string;
  roles: Array<string>;
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

  constructor(private userService: UserSecurityService) {
  }

  ngOnInit() {
    this.#serviceSubscription = this.userService.observe().subscribe(x => this.updateUserLinks());
  }

  ngOnDestroy(): void {
    this.#serviceSubscription.unsubscribe();
  }

  hasRoles(roles: Array<string>) {
    return roles.every(x => this.userService.hasRight(x));
  }

  private updateUserLinks() {
    this.userLinks = this.allLinks.filter(l => l.roles.length === 0 || this.hasRoles(l.roles));
  }
}
