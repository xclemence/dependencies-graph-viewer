import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { By } from '@angular/platform-browser';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { Assembly, AssemblyColors } from '@app/core/models';
import { ForceGraphComponent } from '@app/shared/components';
import { BusyComponent } from '@app/shared/components/busy/busy.component';
import { GraphLink, GraphNode } from '@app/shared/models';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { loadAssemblyDepth } from '../../store/actions';
import { assemblyDepthStateSelector } from '../../store/assembly.selectors';
import { AssemblyState } from '../../store/models';
import { AssemblyDetailsComponent } from './assembly-details.component';

const initialState = {
  assembly: {
    assemblyDepth: undefined
  },
  core: {
    busy: {
      actionsInProgress: []
    }
  }
};

describe('NotFoundComponent', () => {
  let component: AssemblyDetailsComponent;
  let fixture: ComponentFixture<AssemblyDetailsComponent>;
  let mockAssemblyDepthSelector: MemoizedSelector<AssemblyState, Assembly>;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        MatSliderModule
      ],
      declarations: [AssemblyDetailsComponent, ForceGraphComponent, BusyComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { name: 'test1', depthMax: 10, id: '1' }
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

    mockAssemblyDepthSelector = mockStore.overrideSelector(assemblyDepthStateSelector, undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display assemblyName', () => {
    const element = fixture.debugElement.query(By.css('h3'));
    expect(element.nativeElement.textContent.trim()).toBe('Depth View : test1');
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

  it('should generate graph data', () => {
    const inputAssembly = {
      id: '1',
      name: 'name1',
      version: '1.0',
      isNative: false,
      isSoftware: false,
      links: [
        { sourceId: '1', targetId: '2' }
      ],
      referencedAssemblies: [
        { id: '2', name: 'name2', version: '2.0', isNative: true, isSoftware: false },
      ]
    };

    const expectedGraphData = {
      nodes: [
        new GraphNode({ id: '2', label: 'name2 (2.0)', color: AssemblyColors.native }),
        new GraphNode({ id: '1', label: 'name1 (1.0)', color: AssemblyColors.main }),
      ],
      links: [
        new GraphLink({ source: '1', target: '2' })
      ]
    };

    const graphData = component.generateGraphData(inputAssembly);
    expect(graphData).toEqual(expectedGraphData);
  });

  it('should generate graph data with no reference', () => {
    const inputAssembly = {
      id: '1',
      name: 'name1',
      version: '1.0',
      isNative: false,
      isSoftware: false,
      links: [],
      referencedAssemblies: []
    };

    const expectedGraphData = {
      nodes: [
        new GraphNode({ id: '1', label: 'name1 (1.0)', color: AssemblyColors.main }),
      ],
      links: []
    };

    const graphData = component.generateGraphData(inputAssembly);
    expect(graphData).toEqual(expectedGraphData);
  });

  it('should refresh graph on state updated', fakeAsync(() => {
    const generateGraphDataSpy = spyOn(component, 'generateGraphData').and.callThrough();

    const inputAssembly = {
      id: '1',
      name: 'name1',
      version: '1.0',
      isNative: false,
      isSoftware: false,
      links: [],
      referencedAssemblies: []
    };

    mockAssemblyDepthSelector.setResult(inputAssembly);
    mockStore.refreshState();

    expect(generateGraphDataSpy).toHaveBeenCalledTimes(1);

  }));
});
