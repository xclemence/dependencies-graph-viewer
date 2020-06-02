import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { loadAssemblyDepth } from './../store/actions/assembly-depth.actions';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Graph, Node, Link } from '@app/shared/models';
import { Assembly } from '@app/core/models/assembly';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AssemblyState } from '../store/models';
import { Store } from '@ngrx/store';
import { assemblyDepthStateSelector } from '../store/assembly.selectors';

@Component({
  selector: 'app-assembly-details',
  templateUrl: './assembly-details.component.html',
  styleUrls: ['./assembly-details.component.scss']
})
export class AssemblyDetailsComponent implements OnInit, OnDestroy {

  assemblyName: string;
  depthMax = 10;
  graph: Observable<Graph>;

  private _selectedDepth = 1;
  private _depthChanged: BehaviorSubject<number>;

  private _assemblyId: string;
  private _subscription: Subscription;

  public set selectedDepth(value: number) {
    if (value === this._selectedDepth) {
      return;
    }
    this._selectedDepth = value;
    this.loadDepth(value);
  }

  public get selectedDepth(): number {
    return this._selectedDepth;
  }

  constructor(private _store: Store<AssemblyState>, @Inject(MAT_DIALOG_DATA) data: {name: string, depthMax: number, id: string}) {
    this.assemblyName = data.name;
    this._assemblyId = data.id;
    this.depthMax = data.depthMax;

    this._depthChanged = new BehaviorSubject(this.selectedDepth);
  }

  ngOnInit() {

    this.graph = this._store.select(assemblyDepthStateSelector).pipe(
      map(x => this.generateGraphData(x))
    );

    this._subscription = this._depthChanged.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(x => this._store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblyDepth( { assemblyId: this._assemblyId, depth: x }), 'AssemblyDepth')));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  loadDepth(value: number) {
    this._depthChanged.next(value);
  }

  generateGraphData(assembly: Assembly): Graph {
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
