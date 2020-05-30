import { tap, map } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AssemblyBase } from '@app/core/models/assembly';
import { Store, select } from '@ngrx/store';
import { SoftwareState } from '../store/models';
import { Observable } from 'rxjs';

import { softwareNameStateSelector } from '../store/software.selectors';

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

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.softwareNames = this.store.pipe(
      select(softwareNameStateSelector),
      map(x => x.softwareNames),
      tap(x => {
        this.selectedSoftwares = x.filter(s => s.id === this.selectedId);
        if (this.selectedSoftwares) {
          this.selectionChanged();
        }
      }),
    );
  }

  selectionChanged() {
    this.selectionChange.emit(this.selectedSoftwares[0]);
  }
}
