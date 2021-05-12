import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toGraph } from '@app/shared/converters';
import { Graph } from '@app/shared/models';
import { isNotNullOrUndefined } from '@app/shared/type-guards';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
export class SoftwareReferencesComponent {

  graph: Observable<Graph | undefined>;
  filteredAssemblies: Observable<string[] | undefined>;
  displayLabel: Observable<boolean>;

  visibilityPanelOpened = false;
  hoveredNode?: string;

  constructor(private store: Store<SoftwareState>) {
    this.graph = this.store.pipe(
      select(softwareSelector),
      map(x => x ? toGraph(x) : undefined),
    );

    this.filteredAssemblies = this.store.pipe(select(filteredAssembliesStateSelector));
    this.displayLabel = this.store.pipe(select(displayLabelSelector), filter(isNotNullOrUndefined));
  }

  openVisibilityPanel(): void {
    this.visibilityPanelOpened = true;
  }

  closeVisibilityPanel(): void {
    this.visibilityPanelOpened = false;
  }

  onLabelVisibilityChanged(value: boolean): void {
    this.store.dispatch(displayLabel({value}));
  }
}
