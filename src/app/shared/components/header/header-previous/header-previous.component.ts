import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-previous',
  templateUrl: './header-previous.component.html'
})
export class HeaderPreviousComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
