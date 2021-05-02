import { Component } from '@angular/core';
import { HeaderLink } from '@app/shared/components';

@Component({
  selector: 'app-test',
  template: `
    <dgv-header-links [allLinks]=links></dgv-header-links>
    <router-outlet appSecureOutlet></router-outlet>
  `
})
export class TestComponent {

  links: Array<HeaderLink> = [
    { path : 'user', label: 'User', roles: [ ] },
    { path : 'notfound', label: 'Not found', roles: [ 'admin' ] },
  ];
}
