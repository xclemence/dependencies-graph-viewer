import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { AssemblyColors } from '@app/core/models';
import { UrlService } from '@app/core/services';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, Subject } from 'rxjs';

import { AssemblyService } from '../services/assembly.service';
import { SortDefinitionConvertorService } from '../services/sort-definition-convertor.service';
import { loadAssemblies } from '../store/actions';
import { assembliesStateSelector } from '../store/assembly.selectors';
import { AssemblyFiltered, AssemblyState } from '../store/models';
import { AssemblyListComponent } from './assembly-list.component';

describe('AssemblyListComponent', () => {
  let component: AssemblyListComponent;
  let fixture: ComponentFixture<AssemblyListComponent>;
  let assembliesStateSelectorMock: MemoizedSelector<AssemblyState, AssemblyFiltered>;
  let mockStore: MockStore;
  let assemblyServiceSpy: jasmine.SpyObj<AssemblyService>;
  let convertorServiceSpy: jasmine.SpyObj<SortDefinitionConvertorService>;
  let urlServiceSpy: jasmine.SpyObj<UrlService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let paramMap: Subject<ParamMap>;

  const initialState = {
    assembly: {
      assemblies: {
        filtered: undefined,
        count: 0
      }
    },
    core: {
      busy: {
        actionsInProgress: []
      }
    }
  };

  const viewAssembly = {
    id: 'Dependencies Viewer, Version=2.0.0.0',
    name: 'Dependencies Viewer',
    version: '2.0.0.0',
    isSoftware: true,
    isNative: true,
    depthMax: 4,
    assemblyLinkCount: 8
  };

  const analyserAssembly = {
    id: 'Dependencies.Analyser, Version=2.0.0.0',
    name: 'Dependencies.Analyser.Native',
    version: '1.0.0.0',
    isNative: true,
    isSoftware: false,
    depthMax: 3,
    assemblyLinkCount: 2
  };


  beforeEach(async(() => {
    paramMap = new Subject<ParamMap>();
    assemblyServiceSpy = jasmine.createSpyObj<AssemblyService>('service', ['remove']);
    convertorServiceSpy = jasmine.createSpyObj<SortDefinitionConvertorService>('serviceConvertor', ['getAssemblyServiceOrder']);
    urlServiceSpy = jasmine.createSpyObj<UrlService>('urlService', ['replaceSegment', 'removeAt']);
    matDialogSpy = jasmine.createSpyObj<MatDialog>('matDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule
      ],
      declarations: [AssemblyListComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AssemblyService, useValue: assemblyServiceSpy },
        { provide: AssemblyService, useValue: assemblyServiceSpy },
        { provide: SortDefinitionConvertorService, useValue: convertorServiceSpy },
        { provide: UrlService, useValue: urlServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: paramMap.asObservable() } },
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);

    assembliesStateSelectorMock = mockStore.overrideSelector(assembliesStateSelector, undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Native Type', () => {
    const assembly = { ...viewAssembly, isNative: true };
    expect(component.getAssemblyTypeName(assembly)).toBe('Native');
  });

  it('should return Managed Type', () => {
    const assembly = { ...viewAssembly, isNative: false };
    expect(component.getAssemblyTypeName(assembly)).toBe('Managed');
  });

  it('should return has no reference', () => {
    const assembly = { ...viewAssembly, depthMax: 0 };
    expect(component.hasReferences(assembly)).toBe(false);
  });

  it('should native color', () => {
    const assembly = { ...viewAssembly, isNative: true };
    expect(component.getTypeColor(assembly)).toBe(AssemblyColors.native);
  });

  it('should managed color', () => {
    const assembly = { ...viewAssembly, isNative: false };
    expect(component.getTypeColor(assembly)).toBe(AssemblyColors.managed);
  });

  it('should load assemblise data', fakeAsync(() => {
    assembliesStateSelectorMock.setResult({
      filtered: [
        { ...viewAssembly },
        { ...analyserAssembly },
      ],
      count: 100
    });

    mockStore.refreshState();
    fixture.detectChanges();

    const rowElements = fixture.debugElement.queryAll(By.css('.cdk-row'));
    expect(rowElements.length).toBe(2);
  }));

  it('should update paginator label', fakeAsync(() => {
    assembliesStateSelectorMock.setResult({
      filtered: [
        { ...viewAssembly }
      ],
      count: 100
    });

    mockStore.refreshState();
    fixture.detectChanges();

    const paginatorLabel = fixture.debugElement.query(By.css('.mat-paginator-range-label'));
    expect(paginatorLabel.nativeElement.textContent.trim()).toBe('1 – 20 of 100');
  }));

  it('should ask for reload on sort changed', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.handleSortChanged(undefined);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  }));

  it('should ask for reload on page changed', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.handlePageChanged({
      pageIndex: 2,
      length: 100,
      pageSize: 2
    });

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(component.currentPage).toBe(2);
  }));

  it('should delete item', fakeAsync(() => {

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

    assemblyServiceSpy.remove.and.returnValue(of('test'));
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    const updateAssemblySpy = spyOn<any>(component, 'updateAssemblies');

    component.removeAssembly(viewAssembly, undefined);

    tick();

    expect(updateAssemblySpy).toHaveBeenCalledTimes(1);
    expect(assemblyServiceSpy.remove).toHaveBeenCalledTimes(1);
  }));

  it('should not delete item', fakeAsync(() => {

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });

    assemblyServiceSpy.remove.and.returnValue(of('test'));
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    const updateAssemblySpy = spyOn<any>(component, 'updateAssemblies');

    component.removeAssembly(viewAssembly, undefined);

    tick();

    expect(updateAssemblySpy).toHaveBeenCalledTimes(0);
    expect(assemblyServiceSpy.remove).toHaveBeenCalledTimes(0);
  }));

  it('should open details screen', fakeAsync(() => {

    const route = TestBed.inject(ActivatedRoute);

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), afterOpened: of(true) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    const updateAssemblySpy = spyOn<any>(component, 'updateAssemblies');

    component.openDetails(viewAssembly);

    tick();

    expect(urlServiceSpy.replaceSegment).toHaveBeenCalledWith(1, viewAssembly.id, route);
    expect(urlServiceSpy.removeAt).toHaveBeenCalledWith(1, route);

  }));

  it('should try open details screen from parameter with no data', fakeAsync(() => {

    const tryOpenSpy = spyOn(component, 'tryOpenDetailsFromParameter').and.callThrough();
    const openSpy = spyOn(component, 'openDetails').and.callThrough();

    paramMap.next(convertToParamMap({ id: '1' }));

    tick();

    expect(tryOpenSpy).toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
  }));

  it('should try open details screen from parameter with id not found', fakeAsync(() => {

    const tryOpenSpy = spyOn(component, 'tryOpenDetailsFromParameter').and.callThrough();
    const openSpy = spyOn(component, 'openDetails').and.callFake(x => { });

    assembliesStateSelectorMock.setResult({
      filtered: [
        { ...viewAssembly, id: '1' }
      ],
      count: 100
    });

    mockStore.refreshState();

    paramMap.next(convertToParamMap({ id: 'bad id' }));

    tick();

    expect(tryOpenSpy).toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
  }));

  it('should open details screen from parameter', fakeAsync(() => {

    const tryOpenSpy = spyOn(component, 'tryOpenDetailsFromParameter').and.callThrough();
    const openSpy = spyOn(component, 'openDetails').and.callFake(x => { });

    assembliesStateSelectorMock.setResult({
      filtered: [
        { ...viewAssembly, id: '1' }
      ],
      count: 100
    });

    mockStore.refreshState();

    paramMap.next(convertToParamMap({ id: '1' }));

    tick();

    expect(tryOpenSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalled();
  }));

  it('should refresh view with filter', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const searchElements = fixture.debugElement.query(By.css('#searchInput'));

    const expectedAction = ActionBusyAppender.executeWithMainBusy(loadAssemblies({
      take: component.pageSize,
      page: component.currentPage,
      filter: 'test',
      order: undefined
    }));

    searchElements.nativeElement.value = 'test';
    searchElements.nativeElement.dispatchEvent(new MouseEvent('keyup'));
    searchElements.nativeElement.dispatchEvent(new MouseEvent('keyup'));

    tick(500);

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  }));
});
