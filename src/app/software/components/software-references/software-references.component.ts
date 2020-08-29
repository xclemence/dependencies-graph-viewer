import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toGraph } from '@app/shared/converters';
import { Graph } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../../store/models';
import { filteredAssembliesStateSelector, softwareSelector } from '../../store/software.selectors';
import { displayLabel } from './../../store/actions/software-assemblies.actions';
import { displayLabelSelector } from './../../store/software.selectors';

@Component({
  selector: 'app-software-references',
  templateUrl: './software-references.component.html',
  styleUrls: ['./software-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareReferencesComponent implements OnInit {

  graph: Observable<Graph>;
  filteredAssemblies: Observable<string[]>;
  displayLabel: Observable<boolean>;

  visibilityPanelOpened = false;
  hoveredNode = null;

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.graph = this.store.pipe(
      select(softwareSelector),
      map(x => toGraph(x))
    );

    this.filteredAssemblies = this.store.pipe(select(filteredAssembliesStateSelector));
    this.displayLabel = this.store.pipe(select(displayLabelSelector));
  }

  openVisibilityPanel() {
    this.visibilityPanelOpened = true;
  }

  closeVisibilityPanel() {
    this.visibilityPanelOpened = false;
  }

  onLabelVisibilityChanged(value: boolean) {
    this.store.dispatch(displayLabel({value}));
  }
}
