import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { busyStateSelector } from '@app/core/store/core.selectors';
import { CoreState } from '@app/core/store/models/core.state';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit, OnDestroy {

  @Input() displayed = false;
  @Input() message = 'Loading...';
  @Input() opacity = 1.0;
  @Input() busyKey: string;

  subscription: Subscription;

  @HostBinding('class.collapse') get hidden(): boolean {
    return !this.displayed;
  }

  constructor(private store: Store<CoreState>) {}

  ngOnInit() {
    this.subscription = this.store.pipe(
      select(busyStateSelector),
      map(x => x.actionsInProgress.includes(this.busyKey)),
    ).subscribe(x => this.displayed = x);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
