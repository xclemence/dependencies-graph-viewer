import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AssemblyBase } from '@app/core/models/assembly';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../../store/models';
import { softwareNameStateSelector } from '../../store/software.selectors';

@Component({
  selector: 'sft-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit, OnDestroy {

  #selectedId?: string;
  #storeSubscription?: Subscription;

  @Output() selectionChange: EventEmitter<string> = new EventEmitter();
  @Output() refreshSoftwaresRequest = new EventEmitter();

  softwareNames?: AssemblyBase[];

  selectedSoftwares: AssemblyBase[] = [];

  get selectedId(): string | undefined {
    return this.#selectedId;
  }

  @Input() set selectedId(value: string | undefined) {
    if (value === this.#selectedId) {
      return;
    }

    this.#selectedId = value;
    this.selectSoftwareById();
  }

  constructor(private readonly store: Store<SoftwareState>) { }

  ngOnInit(): void {
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

  private selectSoftwareById(): void {
    if (!this.softwareNames) {
      this.selectedSoftwares = [];
      return;
    }

    this.selectedSoftwares = this.softwareNames.filter(s => s.id === this.selectedId);
  }

  refreshSoftwares(): void {
    this.refreshSoftwaresRequest.emit();
  }

  selectionChanged(): void {
    this.selectionChange.emit(this.selectedSoftwares[0]?.id);
  }
}
