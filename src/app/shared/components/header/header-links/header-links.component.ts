import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor() {
  }

  ngOnInit(): void {
    this.updateUserLinks();
    // this.#serviceSubscription = this.userService.observe().subscribe(x => this.updateUserLinks());
  }

  ngOnDestroy(): void {
    this.#serviceSubscription.unsubscribe();
  }

  hasRoles(roles: Array<string>): boolean {
    return true;
    // return roles.every(x => this.userService.hasRight(x));
  }

  private updateUserLinks(): void {
    this.userLinks = this.allLinks.filter(l => l.roles.length === 0 || this.hasRoles(l.roles));
  }
}
