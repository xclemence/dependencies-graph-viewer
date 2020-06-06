import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { AssemblyStat } from '@app/core/models/assembly';
import { UrlService } from '@app/core/services';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { assembliesStateSelector as assembliesStateSelector } from '../store/assembly.selectors';
import { AssemblyState } from '../store/models';
import { AssemblyDetailsComponent } from './../assembly-details/assembly-details.component';
import { loadAssemblies } from './../store/actions/assemblies.actions';

@Component({
  selector: 'app-assembly-list',
  templateUrl: './assembly-list.component.html',
  styleUrls: ['./assembly-list.component.scss']
})
export class AssemblyListComponent implements OnInit, OnDestroy {

  displayedColumns = ['type', 'name', 'version', 'depth', 'links'];

  dataSource: MatTableDataSource<AssemblyStat>;
  selection = new SelectionModel<AssemblyStat>(false, []);

  private _openDialogSubscription: Subscription;
  private _closeDialogSubscription: Subscription;
  private _routeSubscription: Subscription;
  private _storeSubscription: Subscription;

  private _idParameter: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private _store: Store<AssemblyState>,
    private _urlService: UrlService,
    private _route: ActivatedRoute) {

    this._openDialogSubscription = this.dialog.afterOpened.subscribe(x => {
      this._urlService.replaceSegment(1, x.componentInstance.assemblyId.toString(), this._route);
    });

    this._closeDialogSubscription = this.dialog.afterAllClosed.subscribe(x => this._urlService.removeAt(1, this._route));
  }

  ngOnInit() {

    this._routeSubscription = this._route.paramMap.pipe(
      filter(x => x.has('id')),
      map(x => x.get('id'))
    ).subscribe(x => {
      this._idParameter = x;
      this.tryOpenDetailsFromParameter();
    });

    this._storeSubscription = this._store.pipe(
      select(assembliesStateSelector),
      map(x => {
        const source = new MatTableDataSource(x);
        source.sort = this.sort;
        return source;
      }),
    ).subscribe(x => {
      this.dataSource = x;
      this.tryOpenDetailsFromParameter();
    });

    this._store.dispatch(ActionBusyAppender.executeWithMainBusy(loadAssemblies()));
  }

  ngOnDestroy(): void {
    this._closeDialogSubscription?.unsubscribe();
    this._openDialogSubscription?.unsubscribe();
    this._routeSubscription?.unsubscribe();
    this._storeSubscription?.unsubscribe();
  }

  hasReferences(assemblyStat: AssemblyStat): boolean {
    return assemblyStat.depthMax > 0;
  }

  getAssemblyTypeName(assemblyStat: AssemblyStat): string {
    return assemblyStat.isNative ? 'Native' : 'Managed';
  }

  getTypeColor(assemblyStat: AssemblyStat): string {
    return assemblyStat.isNative ? 'lightgreen' : 'lightblue';
  }

  tryOpenDetailsFromParameter() {
    if (!this._idParameter) {
      return;
    }

    if (!this.dataSource || !this.dataSource.data) {
      return;
    }

    const index = this.dataSource.data.findIndex(x => x.id === this._idParameter);

    if (index !== -1) {
      this.openDetails(this.dataSource.data[index]);
    }
  }

  openDetails(item: AssemblyStat) {
    this.dialog.open(AssemblyDetailsComponent, {
      width: '80%',
      height: '80%',
      data: { name: `${item.name} (${item.version})`, id: item.id, depthMax: item.depthMax }
    });
  }
}
