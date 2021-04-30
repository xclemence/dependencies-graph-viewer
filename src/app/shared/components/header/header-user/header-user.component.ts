import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'dgv-header-user',
  templateUrl: './header-user.component.html'
})
export class HeaderUserComponent implements OnInit {

  userConnected = false;

  userName?: string;

  constructor(private keycloack: KeycloakService) {}

  async ngOnInit() {

    this.userConnected = await this.keycloack.isLoggedIn();

    if(this.userConnected) {
      this.userName = this.keycloack.getUsername();
    }
  }

  async logon() {
    await this.keycloack.login();
  }

  async logout() {
    await this.keycloack.logout();
  }
}
