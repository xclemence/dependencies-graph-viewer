import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDrawerHarness } from '@angular/material/sidenav/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AssemblyColors } from '@app/core/models';
import { DefaultGraphLink, Graph } from '@app/shared/models';
import { displayLabel } from '@app/software/store/actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';

import { softwareAssembliesStateSelector } from '../../store/software.selectors';
import { SoftwareReferencesComponent } from './software-references.component';

@Component({ selector: 'sft-assemblies-visibility', template: '' })
class AssembliesVisibilityStubComponent {
  @Output() closed: EventEmitter<void> = new EventEmitter();
}

@Component({ selector: 'sft-software-statistics', template: '' })
class SoftwareStatisticsStubComponent { }

@Component({ selector: 'dgv-busy', template: '' })
class BusyStubComponent {
  @Input() opacity: number;
  @Input() busyKey: string;
}

@Component({ selector: 'dgv-three-force-graph', template: '' })
class ForceGraphStubComponent {
  @Input() graph: Graph;
  @Input() hoverNodeId: string;
  @Input() filteredNodes: string[];
  @Input() displayNodeLabel: boolean;
}

describe('SoftwareReferencesComponent', () => {
  let component: SoftwareReferencesComponent;
  let fixture: ComponentFixture<SoftwareReferencesComponent>;
  let loader: HarnessLoader;
  let mockStore: MockStore;
  let testScheduler: TestScheduler;

  const initialState = {
    software: {
      assemblies: {
        software: undefined,
        filteredAssemblies: []
      },
      name: {
        softwareNames: []
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [
        SoftwareReferencesComponent,
        AssembliesVisibilityStubComponent,
        SoftwareStatisticsStubComponent,
        BusyStubComponent,
        ForceGraphStubComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SoftwareReferencesComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    fixture.detectChanges();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open visibility view', async () => {
    const openButton = await loader.getHarness(MatButtonHarness);

    component.visibilityPanelOpened = false;
    await openButton.click();

    const drawer = await loader.getHarness(MatDrawerHarness);


    expect(await drawer.isOpen()).toBeTrue();
    expect(component.visibilityPanelOpened).toBeTrue();
  });

  it('should close visibility view', async () => {

    component.visibilityPanelOpened = true;

    const visibilityComponent = fixture.debugElement.query(By.directive(AssembliesVisibilityStubComponent)).componentInstance;

    visibilityComponent.closed.next();

    const drawer = await loader.getHarness(MatDrawerHarness);

    expect(await drawer.isOpen()).toBeFalse();
    expect(component.visibilityPanelOpened).toBeFalse();
  });

  it('should generate graph with one assembly', () => {

    const softwareAssembliesStateSelectorMock = mockStore.overrideSelector(softwareAssembliesStateSelector, undefined);

    const forceGraphComponent = fixture.debugElement.query(By.directive(ForceGraphStubComponent)).componentInstance;

    const softwareTest = {
      id: '1',
      name: 'test',
      version: '1.0',
      isNative: false,
      isSoftware: true,
      links: [],
      referencedAssemblies: [],
      displayLabel: false
    };

    const inputStore = {
      software: softwareTest,
      filteredAssemblies: [],
      displayLabel: false
    };

    softwareAssembliesStateSelectorMock.setResult(inputStore);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(forceGraphComponent.graph).toEqual({
      nodes: [{ id: softwareTest.id, label: `${softwareTest.name} (${softwareTest.version})`, color: AssemblyColors.main }],
      links: []
    });

  });

  it('should generate graph with references', () => {

    const softwareAssembliesStateSelectorMock = mockStore.overrideSelector(softwareAssembliesStateSelector, undefined);

    const forceGraphComponent = fixture.debugElement.query(By.directive(ForceGraphStubComponent)).componentInstance;

    const inputStore = {
      software: {
        id: '1',
        name: 'name1',
        version: '1.0',
        isNative: false,
        isSoftware: false,
        links: [
          { sourceId: '1', targetId: '2' },
          { sourceId: '1', targetId: '3' },
        ],
        referencedAssemblies: [
          { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false },
          { id: '3', name: 'name3', version: '1.0', isNative: true, isSoftware: false },
        ]
      },
      filteredAssemblies: [],
      displayLabel: false
    };

    const expectedGraph = {
      nodes: [
        { id: '2', label: 'name2 (1.0)', color: AssemblyColors.managed },
        { id: '3', label: 'name3 (1.0)', color: AssemblyColors.native },
        { id: '1', label: 'name1 (1.0)', color: AssemblyColors.main }
      ],
      links: [
        new DefaultGraphLink({ source: '1', target: '2' }),
        new DefaultGraphLink({ source: '1', target: '3' })
      ]
    };

    softwareAssembliesStateSelectorMock.setResult(inputStore);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(forceGraphComponent.graph).toEqual(expectedGraph);

  });

  it('should generate undefine graph', () => {

    const softwareAssembliesStateSelectorMock = mockStore.overrideSelector(softwareAssembliesStateSelector, undefined);
    const forceGraphComponent = fixture.debugElement.query(By.directive(ForceGraphStubComponent)).componentInstance;

    const inputStore = {
      software: undefined,
      filteredAssemblies: [],
      displayLabel: false
    };

    softwareAssembliesStateSelectorMock.setResult(inputStore);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(forceGraphComponent.graph).toBeFalsy();
  });

  it('should dispatch event on node label changed', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.onLabelVisibilityChanged(false);
    flush();

    expect(dispatchSpy).toHaveBeenCalledWith(displayLabel({value: false}));
  }));

});
