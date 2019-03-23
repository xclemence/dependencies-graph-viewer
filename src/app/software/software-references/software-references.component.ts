import { AssemblyBase, Assembly } from '@app/core/models/assembly';
import { Component, OnInit, Input, AfterViewChecked, OnDestroy } from '@angular/core';
import { Graph, Node, Link } from '@app/shared/models';
import { SoftwareService } from '@app/core/services/api';
import { SoftwareMockService } from '@app/core/services/api/software-mock.service';
import { Observable, BehaviorSubject, Subscription, iif, of, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-software-references',
  templateUrl: './software-references.component.html',
  styleUrls: ['./software-references.component.scss'],
  providers: [
    {provide: SoftwareService, useClass: SoftwareMockService}
  ]
})
export class SoftwareReferencesComponent implements OnInit, OnDestroy {
  private _softwareName: AssemblyBase;

  graph: Graph;
  assembly: Assembly;
  isBusy: boolean;

  private _assemblyChanged: Subject<AssemblyBase>;
  private _assemblyObservable: Observable<AssemblyBase>;
  private _subscription: Subscription;


  @Input() set software(value: AssemblyBase) {

    if (value === this._softwareName) {
      return;
    }

    this._softwareName = value;
    this._assemblyChanged.next(this._softwareName);
  }

  constructor(private softwareService: SoftwareService) {
    this._assemblyChanged = new Subject<AssemblyBase>();
  }

  ngOnInit() {
    this._assemblyObservable = this._assemblyChanged.pipe(
      distinctUntilChanged()
    );

    this.startAssemblyLoading();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  startAssemblyLoading() {
    this._subscription = this._assemblyObservable.pipe(
      tap(x => {
        this.graph = null;
        this.assembly = null;
      }),
      switchMap(x => iif(() => x === undefined, of(null), this.softwareService.references(x).executeWithBusy(this)))
    ).subscribe(x => this.generateGraphData(x),
                x => this.startAssemblyLoading());
  }

  generateGraphData(assembly: Assembly): any {

    if (assembly === null) {
      return;
    }

    console.log(`strange loding ${assembly.id}`);

    const item = new Graph();
    this.assembly = assembly;
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
