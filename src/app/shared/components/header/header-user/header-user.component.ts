import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/models';
import { AuthenticationService, UserSecurityService } from '@app/security/services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit, OnDestroy {

  private _user: User = null;
  private _userSubscription: Subscription;

  get userConnected(): boolean {
    return this._user !== null && this._user !== undefined;
  }

  get userName(): string {
    return this._user.name;
  }

  constructor(private _router: Router, private _userService: UserSecurityService, private _authSevice: AuthenticationService) { }

  ngOnInit() {
    this._userSubscription = this._userService.observe().subscribe(x => this._user = x);
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  logon() {
    this._router.navigateByUrl('/logon');
  }

  logout() {
    this._authSevice.logout();
  }
}
