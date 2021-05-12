import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dgv-header-previous',
  templateUrl: './header-previous.component.html'
})
export class HeaderPreviousComponent {

  constructor(private location: Location) { }

  back(): void {
    this.location.back();
  }
}
