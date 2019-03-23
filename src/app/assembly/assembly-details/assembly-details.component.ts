import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AssemblyService } from '@app/core/services/api';
import { Graph, Node, Link } from '@app/shared/models';
import { Assembly } from '@app/core/models/assembly';

import '@app/core/extensions/observable-busy';
import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-assembly-details',
  templateUrl: './assembly-details.component.html',
  styleUrls: ['./assembly-details.component.scss']
})
export class AssemblyDetailsComponent implements OnInit, OnDestroy {

  assemblyName: string;
  depthMax = 10;
  graph: Graph;

  private _selectedDepth = 1;
  private _depthChanged: BehaviorSubject<number>;
  private _depthObservable: Observable<number>;

  assemblyId: string;
  isBusy = false;
  subscription: Subscription;

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

  constructor(private _assemblyService: AssemblyService, @Inject(MAT_DIALOG_DATA) data: {name: string, depthMax: number, id: string}) {
    this.assemblyName = data.name;
    this.assemblyId = data.id;
    this.depthMax = data.depthMax;

    this._depthChanged = new BehaviorSubject(this.selectedDepth);
  }

  ngOnInit() {
    this._depthObservable = this._depthChanged.pipe(
      debounceTime(100),
      distinctUntilChanged()
    );

    this.startDepthLoading();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadDepth(value: number) {
    this._depthChanged.next(value);
  }

  startDepthLoading() {
    this.subscription = this._depthObservable.pipe(
      switchMap(x => this._assemblyService.references(this.assemblyId, x).executeWithBusy(this))
    ).subscribe(x => this.generateGraphData(x),
                x => this.startDepthLoading());
  }

  generateGraphData(assembly: Assembly): any {
    const item = new Graph();
    item.nodes = assembly.referencedAssemblies.map(x => new Node({
      id: x.id,
      label: `${x.name} (${x.version})`,
      color: x.isNative ? 'lightGreen' : 'lightBlue'
    }));

    item.nodes.push(new Node({ id: assembly.id, label: `${assembly.name} (${assembly.version})`, color: 'red' }));

    item.links = assembly.links.map(x => new Link({ source: x.sourceId, target: x.targetId }));
    this.graph = item;
  }
}
