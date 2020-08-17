import '@app/core/extensions/observable-busy';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { AssemblyColors, AssemblyStat } from '@app/core/models/assembly';
import { UrlService } from '@app/core/services';
import { CoreState } from '@app/core/store/models';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { select, Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { AssemblyService } from '../../services/assembly.service';
import { SortDefinitionConvertorService } from '../../services/sort-definition-convertor.service';
import { assembliesStateSelector } from '../../store/assembly.selectors';
import { AssemblyState } from '../../store/models';
import { loadAssemblies } from './../../store/actions/assemblies.actions';
import { AssemblyDetailsComponent } from './../assembly-details/assembly-details.component';

@Component({
  selector: 'asm-assembly-list',
  templateUrl: './assembly-list.component.html',
  styleUrls: ['./assembly-list.component.scss']
})
export class AssemblyListComponent implements AfterContentInit, AfterViewInit, OnDestroy {

  displayedColumns = ['type', 'name', 'version', 'depth', 'links', 'remove'];

  dataSource: MatTableDataSource<AssemblyStat>;
  selection = new SelectionModel<AssemblyStat>(false, []);
  pageSize = 20;
  assemblyCount = 0;
  currentPage = 0;

  #storeSubscription: Subscription;
  #filterSubscription: Subscription;
  #currentFilter: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    public dialog: MatDialog,
    private store: Store<AssemblyState>,
    private coreStore: Store<CoreState>,
    private assemblyService: AssemblyService,
    private convertorService: SortDefinitionConvertorService,
    private urlService: UrlService,
    private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.#filterSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe({
      next: x => {
        this.currentPage = 0;
        this.#currentFilter = x;
        this.updateAssemblies();
      }
    });
  }

  ngAfterContentInit(): void {
    this.route.paramMap.pipe(
      filter(x => x.has('id')),
      map(x => x.get('id'))
    ).subscribe(x => {
      this.openDetails(x);
    });

    this.#storeSubscription = this.store.pipe(
      select(assembliesStateSelector),
    ).subscribe({
      next: (x) => {
        this.dataSource = this.createDataSource(x?.filtered);
        this.assemblyCount = x?.count ?? 0;
      }
    });

    this.updateAssemblies();
  }

  createDataSource(assemblies: AssemblyStat[]): MatTableDataSource<AssemblyStat> {
    const source = new MatTableDataSource(assemblies ?? []);
    source.sort = this.sort;
    return source;
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
    this.#filterSubscription?.unsubscribe();
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

  openDetails(assemblyId: string) {
    const dialogRef = this.dialog.open(AssemblyDetailsComponent, {
      width: '80%',
      height: '80%',
      data: { id: assemblyId }
    });

    dialogRef.afterOpened().subscribe(() => {
      this.urlService.replaceSegment(1, assemblyId, this.route);
    });

    dialogRef.afterClosed().subscribe(() => {
      this.urlService.removeAt(1, this.route);
    });
  }

  removeAssembly(assembly: AssemblyStat, event: any) {
    event?.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Do you confirm the deletion of ${assembly.name} ?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assemblyService.remove(assembly.id).executeWithMainBusy(this.coreStore).subscribe({
          next: (x) => this.updateAssemblies()
        });
      }
    });
  }

  private updateAssemblies() {
    this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblies({
      take: this.pageSize,
      page: this.currentPage,
      filter: this.#currentFilter,
      order: this.convertorService.getAssemblyServiceOrder(this.sort.active, this.sort.direction)
    }), 'AssemblyList'));
  }

  handlePageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateAssemblies();
  }

  handleSortChanged(event: Sort) {
    this.updateAssemblies();
  }
}
