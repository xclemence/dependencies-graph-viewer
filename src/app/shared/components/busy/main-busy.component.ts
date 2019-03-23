import { BusyService } from '@app/core/services/tech';
import { BusyComponent } from './busy.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class MainBusyComponent extends BusyComponent implements OnInit, OnDestroy {
  busySubscription: Subscription;

  constructor(private busyService: BusyService) {
    super();
   }

  ngOnInit() {
    this.busySubscription = this.busyService.observe().subscribe(x => this.displayed = x);
  }

  ngOnDestroy() {
    this.busySubscription.unsubscribe();
  }
}
