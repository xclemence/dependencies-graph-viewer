import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AssemblyBase } from '@app/core/models/assembly';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../store/models';
import { softwareNameStateSelector } from '../store/software.selectors';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit, OnDestroy {

  #selectedId: string;
  #storeSubscription: Subscription;

  @Output() selectionChange: EventEmitter<AssemblyBase> = new EventEmitter();
  @Output() refreshSoftwaresRequest = new EventEmitter();

  softwareNames: AssemblyBase[];

  selectedSoftwares = new Array<AssemblyBase>();

  get selectedId(): string {
    return this.#selectedId;
  }

  @Input() set selectedId(value: string) {
    if (value === this.#selectedId) {
      return;
    }
    this.#selectedId = value;
    this.selectSoftwareById();
  }

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.#storeSubscription = this.store.pipe(
      select(softwareNameStateSelector),
      map(x => x.softwareNames),
    ).subscribe(x => {
      this.softwareNames = x;
      this.selectSoftwareById();
    });
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
  }

  private selectSoftwareById() {
    if (!this.softwareNames) {
      return;
    }

    this.selectedSoftwares = this.softwareNames.filter(s => s.id === this.selectedId);

    if (this.selectedSoftwares) {
      this.selectionChanged();
    }
  }

  refreshSoftwares() {
    this.refreshSoftwaresRequest.emit();
  }

  selectionChanged() {
    this.selectionChange.emit(this.selectedSoftwares[0]);
  }
}
