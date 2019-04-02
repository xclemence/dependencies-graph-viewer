import { Component } from '@angular/core';
import { RouterEventService } from '@app/core/services/tech';
import { HeaderLink } from '@app/shared/components';

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
    // { path : 'test', label: 'Test', roles: [ 'admin' ] }
    { path : 'test', label: 'Test', roles: [ ] }
  ];


  constructor(private router: RouterEventService) { }
}
