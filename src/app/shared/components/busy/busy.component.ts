import { CoreState } from './../../../core/store/models/core.state';
import { Store, select } from '@ngrx/store';
import { Component, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { busyStateSelector } from '@app/core/store/core.selectors';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
