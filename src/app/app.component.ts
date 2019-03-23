import { Component } from '@angular/core';
import { RouterEventService } from '@app/core/services/tech';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DependenciesGraph';

  constructor(private router: RouterEventService) { }
}
