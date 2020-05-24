import { Store, select } from '@ngrx/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { SoftwareService } from '@app/core/services/api';
import { Graph, Link, Node } from '@app/shared/models';
import { iif, Observable, of, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { SoftwareState } from '../store/software.reducer';
import { softwareStateSelector } from '../store/software.selectors';

@Component({
  selector: 'app-software-references',
  templateUrl: './software-references.component.html',
  styleUrls: ['./software-references.component.scss']
})
export class SoftwareReferencesComponent implements OnInit {
  private _softwareName: AssemblyBase;

  graph: Observable<Graph>;
  isBusy: boolean;

  constructor(private store: Store<SoftwareState>) {
  }

  ngOnInit() {
    this.graph = this.store.pipe(
      select(softwareStateSelector),
      map(x => this.generateGraphData(x.selectedAssembly)),
    );
  }

  generateGraphData(assembly: Assembly): any {

    if (assembly == null) {
      return null;
    }

    console.log(`strange loding ${assembly.id}`);

    const item = new Graph();
    item.nodes = assembly.referencedAssemblies.map(x => new Node({
      id: x.id,
      label: `${x.name} (${x.version})`,
      color: x.isNative ? 'lightGreen' : 'lightBlue'
    }));

    item.nodes.push(new Node({ id: assembly.id, label: `${assembly.name} (${assembly.version})`, color: 'red' }));

    item.links = assembly.links.map(x => new Link({ source: x.sourceId, target: x.targetId }));

    return item;
  }
}
