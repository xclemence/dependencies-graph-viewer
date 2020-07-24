import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Assembly, AssemblyColors } from '@app/core/models';
import { Graph, GraphLink, GraphNode } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../store/models';
import { softwareAssembliesStateSelector } from '../store/software.selectors';

@Component({
  selector: 'app-software-references',
  templateUrl: './software-references.component.html',
  styleUrls: ['./software-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareReferencesComponent implements OnInit {

  graph: Observable<Graph>;
  visibilityPanelOpened = false;

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.graph = this.store.pipe(
      select(softwareAssembliesStateSelector),
      map(x => this.generateGraphData(x.software, x.filteredAssemblies))
    );
  }

  private generateGraphData(assembly: Assembly, filteredAssemblyIds: string[]): Graph {
    if (!assembly) {
      return null;
    }

    const nodes = assembly.referencedAssemblies.filter(x => !filteredAssemblyIds.includes(x.id)).map(x => new GraphNode({
      id: x.id,
      label: `${x.name} (${x.version})`,
      color: x.isNative ? AssemblyColors.native : AssemblyColors.managed
    }));

    nodes.push(new GraphNode({ id: assembly.id, label: `${assembly.name} (${assembly.version})`, color: AssemblyColors.main }));

    const links = assembly.links
      .filter(x => !filteredAssemblyIds.includes(x.targetId) && !filteredAssemblyIds.includes(x.sourceId))
      .map(x => new GraphLink({ source: x.sourceId, target: x.targetId }));

    return { nodes, links };
  }

  openVisibilityPanel() {
    this.visibilityPanelOpened = true;
  }

  closeVisibilityPanel() {
    this.visibilityPanelOpened = false;
  }
}
