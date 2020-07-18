import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { Assembly, AssemblyColors } from '@app/core/models/assembly';
import { Graph, GraphLink, GraphNode } from '@app/shared/models';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { assemblyDepthStateSelector } from '../store/assembly.selectors';
import { AssemblyState } from '../store/models';
import { loadAssemblyDepth } from './../store/actions/assembly-depth.actions';

@Component({
  selector: 'app-assembly-details',
  templateUrl: './assembly-details.component.html',
  styleUrls: ['./assembly-details.component.scss']
})
export class AssemblyDetailsComponent implements OnInit, OnDestroy {

  assemblyName: string;
  depthMax = 10;
  graph: Observable<Graph>;

  #selectedDepth = 1;
  #depthChanged: BehaviorSubject<number>;
  #subscription: Subscription;

  assemblyId: string;

  public set selectedDepth(value: number) {
    if (value === this.#selectedDepth) {
      return;
    }
    this.#selectedDepth = value;
    this.loadDepth(value);
  }

  public get selectedDepth(): number {
    return this.#selectedDepth;
  }

  constructor(private store: Store<AssemblyState>, @Inject(MAT_DIALOG_DATA) data: { name: string, depthMax: number, id: string }) {
    this.assemblyName = data.name;
    this.assemblyId = data.id;
    this.depthMax = data.depthMax;

    this.#depthChanged = new BehaviorSubject(this.selectedDepth);
  }

  ngOnInit() {

    this.graph = this.store.select(assemblyDepthStateSelector).pipe(
      filter(x => x !== undefined),
      map(x => this.generateGraphData(x))
    );

    this.#subscription = this.#depthChanged.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(x => this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblyDepth({ assemblyId: this.assemblyId, depth: x }), 'AssemblyDepth')));
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }

  loadDepth(value: number) {
    this.#depthChanged.next(value);
  }

  get depthAvailable(): boolean {
    return this.depthMax > 1;
  }

  generateGraphData(assembly: Assembly): Graph {
    const item = new Graph();
    item.nodes = assembly.referencedAssemblies.map(x => new GraphNode({
      id: x.id,
      label: `${x.name} (${x.version})`,
      color: x.isNative ? AssemblyColors.native : AssemblyColors.managed
    }));

    item.nodes.push(new GraphNode({ id: assembly.id, label: `${assembly.name} (${assembly.version})`, color: AssemblyColors.main }));

    item.links = assembly.links.map(x => new GraphLink({ source: x.sourceId, target: x.targetId }));
    return item;
  }
}
