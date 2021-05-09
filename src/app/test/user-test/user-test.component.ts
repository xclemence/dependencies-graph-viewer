import { Component, OnInit } from '@angular/core';
import { CoreState } from '@app/core/store/models';
import { securityStateSelector } from '@app/security/store/security.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html'
})
export class UserTestComponent implements OnInit {

  result: Observable<any>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.result = this.store.select(securityStateSelector);
  }

}
