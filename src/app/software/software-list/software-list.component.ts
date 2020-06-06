import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssemblyBase } from '@app/core/models/assembly';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SoftwareState } from '../store/models';
import { softwareNameStateSelector } from '../store/software.selectors';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit {

  private _selectedId: string;

  @Output() selectionChange: EventEmitter<AssemblyBase> = new EventEmitter();

  softwareNames: Observable<AssemblyBase[]>;
  currentSoftwareNames: AssemblyBase[];

  selectedSoftwares = new Array<AssemblyBase>();

  get selectedId(): string {
    return this._selectedId;
  }

  @Input() set selectedId(value: string) {
    if (value === this._selectedId) {
      return;
    }
    this._selectedId = value;
    this.selectSoftwareById();
  }

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.softwareNames = this.store.pipe(
      select(softwareNameStateSelector),
      map(x => x.softwareNames),
      tap(x => {
        this.currentSoftwareNames = x;
        this.selectSoftwareById();
      }),
    );
  }

  selectSoftwareById() {
    if (!this.currentSoftwareNames) {
      return;
    }

    if (!this.selectedId) {
      return;
    }

    this.selectedSoftwares = this.currentSoftwareNames.filter(s => s.id === this.selectedId);

    if (this.selectedSoftwares) {
      this.selectionChanged();
    }
  }

  selectionChanged() {
    this.selectionChange.emit(this.selectedSoftwares[0]);
  }
}
