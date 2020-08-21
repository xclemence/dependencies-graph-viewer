import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { loadAssemblyDepthMax } from '@app/assembly/store/actions/assembly-depth-max.actions';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { Assembly, AssemblyColors } from '@app/core/models/assembly';
import { consolidateGraphPosition, toGraphLink, toGraphNode } from '@app/shared/converters';
import { Graph } from '@app/shared/models';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { loadAssemblyDepth } from '../../store/actions/assembly-depth.actions';
import { assemblyDepthMaxStateSelector, assemblyDepthStateSelector } from '../../store/assembly.selectors';
import { AssemblyState } from '../../store/models';

@Component({
  selector: 'asm-assembly-details',
  templateUrl: './assembly-details.component.html',
  styleUrls: ['./assembly-details.component.scss']
})
export class AssemblyDetailsComponent implements OnInit, OnDestroy {

  assemblyName: string;
  depthMax = 10;
  graph: Graph;

  #selectedDepth = 1;
  #depthChanged: BehaviorSubject<number>;
  #depthSubscription: Subscription;
  #storeSubscription: Subscription;
  #storeDepthMaxSubscription: Subscription;

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

  public get depthAvailable(): boolean {
    return this.depthMax > 1;
  }

  constructor(private store: Store<AssemblyState>, @Inject(MAT_DIALOG_DATA) data: { id: string }) {
    this.assemblyId = data.id;

    this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblyDepthMax({ assemblyId: this.assemblyId }), 'AssemblyDepth'));
    this.#depthChanged = new BehaviorSubject(this.selectedDepth);
  }

  ngOnInit() {

    this.#storeDepthMaxSubscription = this.store.select(assemblyDepthMaxStateSelector).pipe(
      filter(x => x !== undefined),
    ).subscribe(x => {
      this.depthMax = x.value;
    });

    this.#storeSubscription = this.store.select(assemblyDepthStateSelector).pipe(
      filter(x => x !== undefined),
    ).subscribe(x => {
      const newGraph = this.generateGraphData(x);
      this.graph = consolidateGraphPosition(newGraph, this.graph);
      this.assemblyName = `${x.name} (${x.version})`;
    });

    this.#depthSubscription = this.#depthChanged.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(x => this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblyDepth({ assemblyId: this.assemblyId, depth: x }), 'AssemblyDepth')));
  }

  ngOnDestroy(): void {
    this.#depthSubscription.unsubscribe();
    this.#storeSubscription.unsubscribe();
    this.#storeDepthMaxSubscription.unsubscribe();
  }

  private loadDepth(value: number) {
    this.#depthChanged.next(value);
  }

  generateGraphData(assembly: Assembly): Graph {
    const nodes = assembly.referencedAssemblies.map(x => toGraphNode(x));

    nodes.push(toGraphNode(assembly, AssemblyColors.main));

    return {
      nodes,
      links: assembly.links.map(x => toGraphLink(x))
    };
  }
}
