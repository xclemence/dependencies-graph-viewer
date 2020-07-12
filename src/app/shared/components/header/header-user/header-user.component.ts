import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/models';
import { AuthenticationService, UserSecurityService } from '@app/security/services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html'
})
export class HeaderUserComponent implements OnInit, OnDestroy {

  #user: User = null;
  #userSubscription: Subscription;

  get userConnected(): boolean {
    return this.#user !== null && this.#user !== undefined;
  }

  get userName(): string {
    return this.#user.name;
  }

  constructor(private router: Router, private userService: UserSecurityService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.#userSubscription = this.userService.observe().subscribe(x => this.#user = x);
  }

  ngOnDestroy(): void {
    this.#userSubscription.unsubscribe();
  }

  logon() {
    this.router.navigateByUrl('/logon');
  }

  logout() {
    this.authenticationService.logout();
  }
}
