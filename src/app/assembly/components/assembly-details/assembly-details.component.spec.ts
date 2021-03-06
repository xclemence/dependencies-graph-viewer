import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { Assembly } from '@app/core/models';
import { ForceGraphComponent } from '@app/shared/components';
import { BusyComponent } from '@app/shared/components/busy/busy.component';
import { toGraph } from '@app/shared/converters';
import { SnowDialogDirective } from '@app/shared/directives/snow-dialog.directive';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { loadAssemblyDepth } from '../../store/actions';
import { assemblyDepthMaxStateSelector, assemblyDepthStateSelector } from '../../store/assembly.selectors';
import { AssemblyState } from '../../store/models';
import { AssemblyDetailsComponent } from './assembly-details.component';

const initialState = {
  assembly: {
    assemblyDepth: undefined
  },
  core: {
    snow: { activated: false },
    busy: {
      actionsInProgress: []
    }
  }
};

describe('AssemblyDetailsComponent', () => {
  let component: AssemblyDetailsComponent;
  let fixture: ComponentFixture<AssemblyDetailsComponent>;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        MatSliderModule,
        MatTooltipModule,
        MatIconModule
      ],
      declarations: [AssemblyDetailsComponent, ForceGraphComponent, BusyComponent, SnowDialogDirective],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: '1' }
        },
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update depth max', () => {
    const mockAssemblyDepthMaxSelector = mockStore.overrideSelector(assemblyDepthMaxStateSelector, undefined);

    mockAssemblyDepthMaxSelector.setResult({ assemblyId: 'test', value: 10});
    mockStore.refreshState();

    expect(component.depthMax).toBe(10);
  });

  it('should load new depth', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.selectedDepth = 3;
    tick(200);

    expect(dispatchSpy).toHaveBeenCalled();
  }));

  it('should load one time new depth', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.selectedDepth = 3;
    component.selectedDepth = 4;
    component.selectedDepth = 4;
    tick(200);

    const expectedAction = ActionBusyAppender.executeWithBusy(loadAssemblyDepth({ assemblyId: '1', depth: 4 }), 'AssemblyDepth');

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  }));

  it('should refresh graph on state updated', fakeAsync(() => {

    const inputAssembly = {
      id: '1',
      name: 'name1',
      version: '1.0',
      isNative: false,
      isSoftware: false,
      links: [],
      referencedAssemblies: []
    };

    const mockAssemblyDepthSelector = mockStore.overrideSelector(assemblyDepthStateSelector, undefined);

    mockAssemblyDepthSelector.setResult(inputAssembly);
    mockStore.refreshState();

    expect(component.graph).toEqual(toGraph(inputAssembly));
  }));

  it('should update name', fakeAsync(() => {

    const inputAssembly = {
      id: '1',
      name: 'name1',
      version: '1.0',
      isNative: false,
      isSoftware: false,
      links: [],
      referencedAssemblies: []
    };

    const mockAssemblyDepthSelector = mockStore.overrideSelector(assemblyDepthStateSelector, undefined);

    mockAssemblyDepthSelector.setResult(inputAssembly);
    mockStore.refreshState();

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('h3'));
    expect(element.nativeElement.textContent.trim()).toBe('Depth View : name1 (1.0)');

  }));

  it('should close dialog', () => {
    const closeSpy = spyOn(component.dialogRef, 'close');
    component.close();
    expect(closeSpy).toHaveBeenCalled();
  });
});
