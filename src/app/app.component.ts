import { Component } from '@angular/core';
import { HeaderLink } from '@app/shared/components';

import { TestModuleRightsKey } from './app-security.module';
import { SecurityConfigurationService } from './security/services/security-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DependenciesGraph';

  links: Array<HeaderLink> = [
    { path : 'software', label: 'Software', roles: [ ] },
    { path : 'assembly', label: 'Assembly', roles: [ ] },
  ];

  constructor(private securityConfigurationService: SecurityConfigurationService) {
    const testModuleRights = securityConfigurationService.getRights(TestModuleRightsKey);

    this.links.push({ path: 'test', label: 'Test', roles: testModuleRights.rights});
  }
}
