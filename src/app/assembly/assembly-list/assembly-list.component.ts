import '@app/core/extensions/observable-busy';

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { AssemblyColors, AssemblyStat } from '@app/core/models/assembly';
import { UrlService } from '@app/core/services';
import { CoreState } from '@app/core/store/models';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AssemblyService } from '../services/assembly.service';
import { assembliesStateSelector } from '../store/assembly.selectors';
import { AssemblyState } from '../store/models';
import { AssemblyDetailsComponent } from './../assembly-details/assembly-details.component';
import { loadAssemblies } from './../store/actions/assemblies.actions';

@Component({
  selector: 'app-assembly-list',
  templateUrl: './assembly-list.component.html',
  styleUrls: ['./assembly-list.component.scss']
})
export class AssemblyListComponent implements OnInit, OnDestroy {

  displayedColumns = ['type', 'name', 'version', 'depth', 'links', 'remove'];

  dataSource: MatTableDataSource<AssemblyStat>;
  selection = new SelectionModel<AssemblyStat>(false, []);
  pageSize = 20;
  assemblyCount = 0;
  currentPage = 0;

  #storeSubscription: Subscription;

  #idParameter: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private store: Store<AssemblyState>,
    private coreStore: Store<CoreState>,
    private assemblyService: AssemblyService,
    private urlService: UrlService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.pipe(
      filter(x => x.has('id')),
      map(x => x.get('id'))
    ).subscribe(x => {
      this.#idParameter = x;
      this.tryOpenDetailsFromParameter();
    });

    this.#storeSubscription = this.store.pipe(
      select(assembliesStateSelector)
    ).subscribe({
      next: (x) => {
        this.dataSource = this.createDataSource(x.filtered);
        this.assemblyCount = x.count;
        this.tryOpenDetailsFromParameter();
      }
    });

    this.updateAssemblies();
  }

  createDataSource(assemblies: AssemblyStat[]): MatTableDataSource<AssemblyStat> {
    const source = new MatTableDataSource(assemblies);
    source.sort = this.sort;
    return source;
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
  }

  hasReferences(assemblyStat: AssemblyStat): boolean {
    return assemblyStat.depthMax > 0;
  }

  getAssemblyTypeName(assemblyStat: AssemblyStat): string {
    return assemblyStat.isNative ? 'Native' : 'Managed';
  }

  getTypeColor(assemblyStat: AssemblyStat): string {
    return assemblyStat.isNative ? AssemblyColors.native : AssemblyColors.managed;
  }

  tryOpenDetailsFromParameter() {
    if (!this.#idParameter) {
      return;
    }

    if (!this.dataSource || !this.dataSource.data) {
      return;
    }

    const index = this.dataSource.data.findIndex(x => x.id === this.#idParameter);

    if (index !== -1) {
      this.openDetails(this.dataSource.data[index]);
    }
  }

  openDetails(item: AssemblyStat) {
    const dialogRef = this.dialog.open(AssemblyDetailsComponent, {
      width: '80%',
      height: '80%',
      data: { name: `${item.name} (${item.version})`, id: item.id, depthMax: item.depthMax }
    });

    dialogRef.afterOpened().subscribe(() => {
      this.urlService.replaceSegment(1, item.id, this.route);
    });

    dialogRef.afterClosed().subscribe(() => {
      this.urlService.removeAt(1, this.route);
    });
  }

  removeAssembly(assembly: AssemblyStat, event: any) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Do you confirm the deletion of ${assembly.name} ?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assemblyService.remove(assembly.id).executeWithMainBusy(this.coreStore).subscribe(
          (x) => this.updateAssemblies()
        );
      }
    });
  }

  private updateAssemblies() {
    this.store.dispatch(ActionBusyAppender.executeWithMainBusy(loadAssemblies({
      take: this.pageSize,
      page: this.currentPage,
      filter: undefined,
      order: undefined
    })));
  }

  handlePageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updateAssemblies();
  }
}
