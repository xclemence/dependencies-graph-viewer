import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    { path : 'software', label: 'Software' },
    { path : 'assembly', label: 'Assembly' },
    { path : 'test', label: 'Test' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
