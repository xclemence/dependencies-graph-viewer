import { Component, OnDestroy, OnInit } from '@angular/core';
import { snowStateSelector } from '@app/core/store/core.selectors';
import { CoreState } from '@app/core/store/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dgv-snow',
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.scss']
})
export class SnowComponent implements OnInit, OnDestroy {

  activated = false;
  #storeSubscription?: Subscription;

  constructor(private coreStore: Store<CoreState>) { }

  ngOnInit(): void {
    this.#storeSubscription = this.coreStore.pipe(
      select(snowStateSelector),
    ).subscribe({
      next: (x) => {
        this.activated = x.activated;
      }
    });
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
  }

  duckNumber(): number[] {
    return new Array(10);
  }
}
