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
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { select, Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { AssemblyService } from '../../services/assembly.service';
import { SortDefinitionConverterService } from '../../services/sort-definition-converter.service';
import { assembliesStateSelector } from '../../store/assembly.selectors';
import { loadAssemblies } from './../../store/actions/assemblies.actions';
import { AssemblyDetailsComponent } from './../assembly-details/assembly-details.component';
import { RightService } from '@app/security/services/right.service';
import { removeAssemblyFeature } from '@app/assembly/assembly-security-keys';
import { isNotNullOrUndefined } from '@app/shared/type-guards';

@Component({
  selector: 'asm-assembly-list',
  templateUrl: './assembly-list.component.html',
  styleUrls: ['./assembly-list.component.scss']
})
export class AssemblyListComponent implements AfterContentInit, AfterViewInit, OnDestroy {

  baseColumns = ['type', 'name', 'version', 'depth', 'links'];

  private removeColumnKey = 'remove';


  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<AssemblyStat>();
  selection = new SelectionModel<AssemblyStat>(false, []);
  pageSize = 20;
  assemblyCount = 0;
  currentPage = 0;

  #storeSubscription?: Subscription;
  #filterSubscription?: Subscription;
  #hasRightSubscription?: Subscription;
  #currentFilter = '';

  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  @ViewChild('searchInput') searchInput?: ElementRef;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private assemblyService: AssemblyService,
    private converterService: SortDefinitionConverterService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private rightService: RightService) {

    this.initializeColumns();
  }


  ngAfterViewInit(): void {
    if (this.searchInput) {
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
  }

  ngAfterContentInit(): void {
    this.route.paramMap.pipe(
      filter(x => x.has('id')),
      map(x => x.get('id')),
      filter(isNotNullOrUndefined)
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

  private initializeColumns(): void {
    this.#hasRightSubscription = this.rightService.hasFeature(removeAssemblyFeature)
      .subscribe(x => this.computeColumns(x));
  }

  private computeColumns(allowRemove: boolean): void {
    this.displayedColumns = allowRemove ? [...this.baseColumns, this.removeColumnKey] : [... this.baseColumns];
  }

  createDataSource(assemblies: AssemblyStat[] | undefined): MatTableDataSource<AssemblyStat> {
    const source = new MatTableDataSource(assemblies ?? []);
    if (this.sort) {
      source.sort = this.sort;
    }
    return source;
  }

  ngOnDestroy(): void {
    this.#storeSubscription?.unsubscribe();
    this.#filterSubscription?.unsubscribe();
    this.#hasRightSubscription?.unsubscribe();
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

  openDetails(assemblyId: string): void {
    const dialogRef = this.dialog.open(AssemblyDetailsComponent, {
      width: '98%',
      height: '98%',
      panelClass: 'no-padding-dialog',
      data: { id: assemblyId }
    });

    dialogRef.afterOpened().subscribe(() => {
      this.urlService.replaceSegment(1, assemblyId, this.route);
    });

    dialogRef.afterClosed().subscribe(() => {
      this.urlService.removeAt(1, this.route);
    });
  }

  removeAssembly(assembly: AssemblyStat, event: any): void {
    event?.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Do you confirm the deletion of ${assembly.name} ?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assemblyService.remove(assembly.id).executeWithMainBusy(this.store).subscribe({
          next: (x) => this.updateAssemblies()
        });
      }
    });
  }

  private updateAssemblies(): void {
    this.store.dispatch(ActionBusyAppender.executeWithBusy(loadAssemblies({
      take: this.pageSize,
      page: this.currentPage,
      filter: this.#currentFilter,
      order: this.converterService.getAssemblyServiceOrder(this.sort?.active, this.sort?.direction)
    }), 'AssemblyList'));
  }

  handlePageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateAssemblies();
  }

  handleSortChanged(): void {
    this.updateAssemblies();
  }
}
