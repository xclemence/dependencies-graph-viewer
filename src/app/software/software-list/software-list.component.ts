import { tap } from 'rxjs/operators';
import { BusyService } from '@app/core/services/tech/busy.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AssemblyBase } from '@app/core/models/assembly';
import '@app/core/extensions/observable-busy';
import { Store, select } from '@ngrx/store';
import { SoftwareState } from '../store/software.reducer';
import { Observable } from 'rxjs';

import { softwareStateSelector } from '../store/software.selectors';
import { loadSoftwareNames } from '../store/actions/software-name.actions';
import { json } from 'd3';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit {

  @Output() selectionChange: EventEmitter<AssemblyBase> = new EventEmitter();
  @Input() selectedId: string;

  softwareNames: Observable<AssemblyBase[]>;

  public selectedSoftwares = new Array<AssemblyBase>();

  constructor(private store: Store<SoftwareState>, private busyService: BusyService) { }

  ngOnInit() {
    this.softwareNames = this.store.pipe(
      select(softwareStateSelector),
      select(x => x.softwareNames),
      tap(x => this.selectedSoftwares = x.filter(s => s.id === this.selectedId)),
      tap(x => console.log(JSON.stringify(x)))
    );
  }

  selectionChanged() {
    this.selectionChange.emit(this.selectedSoftwares[0]);
  }
}
