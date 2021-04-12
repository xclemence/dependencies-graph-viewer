import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/core/models';
import { KeycloakService } from 'keycloak-angular';
// import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dgv-header-user',
  templateUrl: './header-user.component.html'
})
export class HeaderUserComponent implements OnInit, OnDestroy {

  #user: User = null;
  #userSubscription: Subscription;

  userConnected = false;

  // get userName(): string {
  //   return "test";
  // }

  userName?: string;

  constructor(
    private dialog: MatDialog,
    private keycloack: KeycloakService
    ) {}

  async ngOnInit() {

    this.userConnected = await this.keycloack.isLoggedIn();

    if(!this.userConnected) {
      // this.keycloack.login();
    }


    if(this.userConnected) {
      this.userName = this.keycloack.getUsername();
    }

    console.log(this.userName);
  }

  ngOnDestroy(): void {
    // this.#userSubscription.unsubscribe();
  }

  logon() {
  }

  logout() {
    this.keycloack.logout();
    // this.oidcSecurityService.logoff();
  }
}
