import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Assembly, AssemblyColors } from '@app/core/models';
import { toGraphLink, toGraphNode } from '@app/shared/converters';
import { Graph } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../../store/models';
import { filteredAssembliesStateSelector, softwareSelector } from '../../store/software.selectors';

@Component({
  selector: 'app-software-references',
  templateUrl: './software-references.component.html',
  styleUrls: ['./software-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareReferencesComponent implements OnInit {

  graph: Observable<Graph>;
  filteredAssemblies: Observable<string[]>;

  visibilityPanelOpened = false;
  #storeSubscription: Subscription;

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.graph = this.store.pipe(
      select(softwareSelector),
      map(x => this.generateGraphData(x, null))
    );

    this.filteredAssemblies = this.store.pipe(select(filteredAssembliesStateSelector));
  }

  private generateGraphData(assembly: Assembly, filteredAssemblyIds: string[]): Graph {
    if (!assembly) {
      return null;
    }

    const nodes = assembly.referencedAssemblies.map(x => toGraphNode(x));

    nodes.push(toGraphNode(assembly, AssemblyColors.main));

    const links = assembly.links.map(x => toGraphLink(x));

    return { nodes, links };
  }

  openVisibilityPanel() {
    this.visibilityPanelOpened = true;
  }

  closeVisibilityPanel() {
    this.visibilityPanelOpened = false;
  }
}
