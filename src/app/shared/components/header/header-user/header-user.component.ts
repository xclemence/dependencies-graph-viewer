import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'dgv-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: [ './header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  userConnected = false;

  userName?: string;

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit(): Promise<void> {

    this.userConnected = await this.keycloak.isLoggedIn();

    if (this.userConnected) {
      this.userName = this.keycloak.getUsername();
    }
  }

  async logon(): Promise<void> {
    await this.keycloak.login();
  }

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }
}
