import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-previous',
  templateUrl: './header-previous.component.html',
  styleUrls: ['./header-previous.component.scss']
})
export class HeaderPreviousComponent {

  constructor(private _location: Location) { }

  back() {
    this._location.back();
  }
}
