import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent {

  @Input() displayed = false;
  @Input() message = 'Loading...';
  @Input() opacity = 1.0;

  @HostBinding('class.collapse') get hidden(): boolean {
    return !this.displayed;
  }
}
