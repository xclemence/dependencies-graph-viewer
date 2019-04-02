import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserSecurityService } from '@app/security/services';
import { Subscription } from 'rxjs';

export class HeaderLink {
  path: string;
  label: string;
  roles: Array<string>;
}

@Component({
  selector: 'app-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.scss']
})
export class HeaderLinksComponent implements OnInit, OnDestroy {
  @Input() allLinks: Array<HeaderLink>;
  @Input() userLinks: Array<HeaderLink>;
  private _serviceSubscription: Subscription;

  constructor(private _userService: UserSecurityService) {
  }

  ngOnInit() {
    this._serviceSubscription = this._userService.observe().subscribe(x => this.updateUserLinks());
  }

  ngOnDestroy(): void {
    this._serviceSubscription.unsubscribe();
  }

  hasRoles(roles: Array<string>) {
    return roles.every(x => this._userService.hasRight(x));
  }

  private updateUserLinks() {
    this.userLinks = this.allLinks.filter(l => l.roles.length === 0 || this.hasRoles(l.roles));
  }
}
