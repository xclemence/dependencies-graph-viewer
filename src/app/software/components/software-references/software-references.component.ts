import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Assembly, AssemblyColors } from '@app/core/models';
import { consolidateGraphPosition, toGraphModel } from '@app/shared/converters';
import { Graph, GraphLink } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../../store/models';
import { softwareAssembliesStateSelector } from '../../store/software.selectors';

@Component({
  selector: 'app-software-references',
  templateUrl: './software-references.component.html',
  styleUrls: ['./software-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareReferencesComponent implements OnInit, OnDestroy {

  graph: Graph;
  visibilityPanelOpened = false;
  #storeSubscription: Subscription;

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.#storeSubscription = this.store.pipe(
      select(softwareAssembliesStateSelector),
      map(x => this.generateGraphData(x.software, x.filteredAssemblies))
    ).subscribe({
      next: x => this.graph = consolidateGraphPosition(x, this.graph)
    });
  }

  ngOnDestroy(): void {
    this.#storeSubscription.unsubscribe();
  }


  private generateGraphData(assembly: Assembly, filteredAssemblyIds: string[]): Graph {
    if (!assembly) {
      return null;
    }

    const nodes = assembly.referencedAssemblies.filter(x => !filteredAssemblyIds.includes(x.id)).map(x => toGraphModel(x));

    nodes.push(toGraphModel(assembly, AssemblyColors.main));

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
