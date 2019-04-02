import { Component, OnInit } from '@angular/core';
import { HeaderLink } from '@app/shared/components';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  links: Array<HeaderLink> = [
    { path : 'user', label: 'User', roles: [ ] },
    { path : 'notfound', label: 'Not found', roles: [ 'admin' ] },
  ];

  constructor() { }

  ngOnInit() {
  }

}
