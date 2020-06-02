import { loadAssemblies } from './../store/actions/assemblies.actions';
import { Store, select } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AssemblyStat } from '@app/core/models/assembly';
import { AssemblyService } from '@app/core/services/api';
import { UrlService } from '@app/core/services/tech';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AssemblyDetailsComponent } from './../assembly-details/assembly-details.component';
import { AssemblyState } from '../store/models';
import { assembliesStateSelector as assembliesStateSelector } from '../store/assembly.selectors';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';

@Component({
  selector: 'app-assembly-list',
  templateUrl: './assembly-list.component.html',
  styleUrls: ['./assembly-list.component.scss']
})
export class AssemblyListComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'version', 'isNative', 'isSystem', 'isSoftware', 'depth', 'links'];

  // dataSource: MatTableDataSource<AssemblyStat>;

  dataSource: Observable<MatTableDataSource<AssemblyStat>>;

  selection = new SelectionModel<AssemblyStat>(false, []);
  // assemblyObservable: Observable<AssemblyStat[]>;

  private _openDialogSubscription: Subscription;
  private _closeDialogSubscription: Subscription;
  private _routeSubscription: Subscription;

  private _idParameter: string = null;

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
      map(x => x.has('id') ? x.get('id') : null),
    ).subscribe(x => this._idParameter = x);

    this.dataSource = this._store.pipe(
      select(assembliesStateSelector),
      tap(x => {
        if (this._idParameter !== null) {
          const index = x.findIndex(y => y.id === this._idParameter);
          if (index !== -1) {
            this.openDetails(x[index]);
          }
        }
      }),
      map(x => {
        const source = new MatTableDataSource(x);
        source.sort = this.sort;
        return source;
      }),
    );

    this._store.dispatch(ActionBusyAppender.executeWithMainBusy(loadAssemblies()));
  }

  ngOnDestroy(): void {
    this._closeDialogSubscription.unsubscribe();
    this._openDialogSubscription.unsubscribe();
  }

  managedAssemblySubscription() {
    // this.assemblyObservable.executeWithMainBusy(this._busyService)
    //                        .subscribe(x => this.updateAssemblies(x, this._idParameter),
    //                                   x => this.managedAssemblySubscription());
  }

  openDetails(item: AssemblyStat) {
    this.dialog.open(AssemblyDetailsComponent, {
      width: '80%',
      height: '80%',
      data: {name: `${item.name} (${item.version})`, id: item.id, depthMax: item.depthMax}
    });
  }

  private updateAssemblies(assemblies: AssemblyStat[], selectedId: string) {
      // this.dataSource = new MatTableDataSource(assemblies);
      // this.dataSource.sort = this.sort;

      // if (selectedId !== null) {
      //   const index = assemblies.findIndex(x => x.id === selectedId);
      //   if (index !== -1) {
      //     this.openDetails(assemblies[index]);
      //   }
      // }
  }
}
