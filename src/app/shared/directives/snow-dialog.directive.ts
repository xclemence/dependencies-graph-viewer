import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { snowStateSelector } from '@app/core/store/core.selectors';
import { CoreState } from '@app/core/store/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dgvSnowDialog]'
})
export class SnowDialogDirective implements OnInit, OnDestroy {

  #storeSubscription?: Subscription;

  @HostBinding('class') hostClass = '';

  constructor(private coreStore: Store<CoreState>) {
  }

  ngOnInit(): void {
    this.#storeSubscription = this.coreStore.pipe(
      select(snowStateSelector),
    ).subscribe({
      next: (x) => {
        this.hostClass = x.activated ? 'snow-dialog' : '';
      }
    });
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
  }
}
