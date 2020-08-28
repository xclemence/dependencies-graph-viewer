import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatListItemHarness } from '@angular/material/list/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NameFilterPipe } from '@app/shared/pipe/name-filter.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { updateFilteredAssemblies } from '../../store/actions';
import { softwareAssembliesStateSelector } from '../../store/software.selectors';
import { displayLabel } from './../../store/actions/software-assemblies.actions';
import { AssembliesVisibilityComponent } from './assemblies-visibility.component';

describe('SoftwareAssembliesComponent', () => {
  let component: AssembliesVisibilityComponent;
  let fixture: ComponentFixture<AssembliesVisibilityComponent>;
  let loader: HarnessLoader;
  let mockStore: MockStore;

  const initialState = {
    software: {
      assemblies: {
        software: {},
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
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        MatCardModule
      ],
      declarations: [
        AssembliesVisibilityComponent,
        NameFilterPipe
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AssembliesVisibilityComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const store = TestBed.inject(MockStore);
    expect(component).toBeTruthy();
  });


  it('should return no indeterminate when collection is null', () => {
    expect(component.isIndeterminateResult(undefined)).toBeFalse();
  });

  it('should return no indeterminate when collection has 1 item', () => {
    expect(component.isIndeterminateResult([{ isVisible: true, name: 'name', id: '1' }])).toBeFalse();
  });

  it('should return no indeterminate when all items have same visibility', () => {
    const assemblies = [
      { name: 'name1', id: '1', isVisible: true },
      { name: 'name2', id: '2', isVisible: true },
    ];

    expect(component.isIndeterminateResult(assemblies)).toBeFalse();
  });

  it('should return indeterminate when all items have multiple visibilities', () => {
    const assemblies = [
      { name: 'name1', id: '1', isVisible: true },
      { name: 'name2', id: '2', isVisible: false },
    ];

    expect(component.isIndeterminateResult(assemblies)).toBeTrue();
  });

  it('should all visible', () => {
    const assemblies = [
      { name: 'name1', id: '1', isVisible: true },
      { name: 'name2', id: '2', isVisible: true },
    ];

    expect(component.isAllVisibleFilterResult(assemblies)).toBeTrue();
  });

  it('should not all visible', () => {
    const assemblies = [
      { name: 'name1', id: '1', isVisible: false },
      { name: 'name2', id: '2', isVisible: true },
    ];

    expect(component.isAllVisibleFilterResult(assemblies)).toBeFalse();
  });

  it('should not all visible when undefined', () => {
    expect(component.isAllVisibleFilterResult(undefined)).toBeFalse();
  });

  it('should change selected item visibility', () => {
    component.assemblies = [
      { name: 'name1', id: '1', isVisible: true },
      { name: 'name2', id: '2', isVisible: true },
      { name: 'name3', id: '3', isVisible: false }
    ];

    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    const expectedAction = updateFilteredAssemblies({
      assemblyIds: ['1', '3']
    });

    component.toggleVisibility(component.assemblies[0]);

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should change displayed items visibility', () => {
    component.assemblies = [
      { name: 'name1', id: '1', isVisible: true },
      { name: 'name2', id: '2', isVisible: true },
      { name: 'name3', id: '3', isVisible: false }
    ];

    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    const expectedAction = updateFilteredAssemblies({
      assemblyIds: ['1', '3']
    });

    const displayedItems = [
      component.assemblies[0],
      component.assemblies[2]
    ];

    component.changeVisibility(displayedItems, false);

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should load data on component', fakeAsync(() => {

    const softwareAssembliesStateSelectorMock = mockStore.overrideSelector(softwareAssembliesStateSelector, undefined);

    const inputStore = {
      software: {
        id: '1',
        name: 'name1',
        version: '1.0',
        isNative: false,
        isSoftware: false,
        links: [],
        referencedAssemblies: [
          { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false },
          { id: '3', name: 'name3', version: '1.0', isNative: false, isSoftware: false },
        ]
      },
      filteredAssemblies: ['3'],
      displayLabel: false
    };

    softwareAssembliesStateSelectorMock.setResult(inputStore);
    mockStore.refreshState();
    tick();

    const expectedAssemblies = [
      { name: 'name2', id: '2', isVisible: true },
      { name: 'name3', id: '3', isVisible: false }
    ];

    expect(component.assemblies).toEqual(expectedAssemblies);

  }));


  it('should load data on template', async () => {

    const softwareAssembliesStateSelectorMock = mockStore.overrideSelector(softwareAssembliesStateSelector, undefined);

    const inputStore = {
      software: {
        id: '1',
        name: 'name1',
        version: '1.0',
        isNative: false,
        isSoftware: false,
        links: [],
        referencedAssemblies: [
          { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false },
          { id: '3', name: 'name3', version: '1.0', isNative: false, isSoftware: false },
        ]
      },
      filteredAssemblies: ['3'],
      displayLabel: false
    };

    softwareAssembliesStateSelectorMock.setResult(inputStore);
    mockStore.refreshState();
    fixture.detectChanges();

    const listItems = await loader.getAllHarnesses(MatListItemHarness);

    expect(listItems.length).toBe(2);
  });

  it('should emit close event on close', () => {
    const emitSpy = spyOn(component.closed, 'emit');

    component.close();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit assembly over', () => {
    const emitSpy = spyOn(component.hoveredItem, 'emit');

    component.onOverItem('test');

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit assembly over twice', () => {

    component.onOverItem('test');

    const emitSpy = spyOn(component.hoveredItem, 'emit');
    component.onOverItem('test');
    expect(emitSpy).not.toHaveBeenCalled();
  });

});
