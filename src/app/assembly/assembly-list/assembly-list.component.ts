import '@app/core/extensions/observable-busy';

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AssemblyStat } from '@app/core/models/assembly';
import { AssemblyService } from '@app/core/services/api';
import { UrlService } from '@app/core/services/tech';
import { BusyService } from '@app/core/services/tech/busy.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AssemblyDetailsComponent } from './../assembly-details/assembly-details.component';

@Component({
  selector: 'app-assembly-list',
  templateUrl: './assembly-list.component.html',
  styleUrls: ['./assembly-list.component.scss']
})
export class AssemblyListComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'version', 'isNative', 'isSystem', 'isSoftware', 'depth', 'links'];

  dataSource: MatTableDataSource<AssemblyStat>;
  selection = new SelectionModel<AssemblyStat>(false, []);
  assemblyObservable: Observable<AssemblyStat[]>;

  private _openDialogSubscription: Subscription;
  private _closeDialogSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  private _idParameter: string;

  constructor(public dialog: MatDialog,
              private _assemblyService: AssemblyService,
              private _urlService: UrlService,
              private _route: ActivatedRoute,
              private _busyService: BusyService) {

    this._openDialogSubscription = this.dialog.afterOpened.subscribe(x => {
      this._urlService.replaceSegment(1, x.componentInstance.assemblyId.toString(), this._route);
    });

    this._closeDialogSubscription = this.dialog.afterAllClosed.subscribe(x => this._urlService.removeAt(1, this._route));
  }

  ngOnInit() {
    this.assemblyObservable = this._route.paramMap.pipe(
      map(x => x.has('id') ? x.get('id') : null),
      tap(x => this._idParameter = x),
      switchMap(x => this._assemblyService.assemblyStatistics(1, 1))
    );

    this.managedAssemblySubscription();
  }

  ngOnDestroy(): void {
    this._closeDialogSubscription.unsubscribe();
    this._openDialogSubscription.unsubscribe();
  }

  managedAssemblySubscription() {
    this.assemblyObservable.executeWithMainBusy(this._busyService)
                           .subscribe(x => this.updateAssemblies(x, this._idParameter),
                                      x => this.managedAssemblySubscription());
  }

  openDetails(item: AssemblyStat) {
    this.dialog.open(AssemblyDetailsComponent, {
      width: '80%',
      height: '80%',
      data: {name: `${item.name} (${item.version})`, id: item.id, depthMax: item.depthMax}
    });
  }

  private updateAssemblies(assemblies: AssemblyStat[], selectedId: string) {
      this.dataSource = new MatTableDataSource(assemblies);
      this.dataSource.sort = this.sort;

      if (selectedId !== null) {
        const index = assemblies.findIndex(x => x.id === selectedId);
        if (index !== -1) {
          this.openDetails(assemblies[index]);
        }
      }
  }
}
