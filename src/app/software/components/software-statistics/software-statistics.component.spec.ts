import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Assembly, AssemblyColors } from '@app/core/models';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SoftwareState } from '../../store/models';
import { softwareSelector } from '../../store/software.selectors';
import { SoftwareStatisticsComponent, StatValue } from './software-statistics.component';

describe('SoftwareStatisticsComponent', () => {
  let component: SoftwareStatisticsComponent;
  let fixture: ComponentFixture<SoftwareStatisticsComponent>;
  let mockStore: MockStore;
  let softwareSelectorMock: MemoizedSelector<SoftwareState, Assembly>;

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [SoftwareStatisticsComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SoftwareStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    softwareSelectorMock = mockStore.overrideSelector(softwareSelector, undefined);
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should return display for no color', () => {
    const display = component.statVisibility(new StatValue({ label: 'test' }));
    expect(display).toBe('none');
  });

  it('should return display for color', () => {
    const display = component.statVisibility(new StatValue({ label: 'test', color: 'red' }));
    expect(display).toBe('inline-block');
  });

  it('should display assembly statistics', () => {
    softwareSelectorMock.setResult({
      id: 'Dependencies Viewer, Version=2.0.0.0',
      name: 'Dependencies Viewer',
      version: '2.0.0.0',
      isSoftware: true,
      isNative: true,
      links: [ ],
      referencedAssemblies: [ ]
    });

    mockStore.refreshState();
    fixture.detectChanges();

    const cardElements = fixture.debugElement.queryAll(By.css('.statistics-card'));

    expect(cardElements.length).toBe(5);
  });

  it('should calculate statistics', () => {
    const assembly = {
      id: 'Dependencies Viewer, Version=2.0.0.0',
      name: 'Dependencies Viewer',
      version: '2.0.0.0',
      isSoftware: true,
      isNative: true,
      links: [
        { sourceId: 'Dependencies Viewer, Version=2.0.0.0', targetId: 'Dependencies.Analyser, Version=2.0.0.0' },
        { sourceId: 'test1', targetId: 'test2' }
      ],
      referencedAssemblies: [
        {
          id: 'Dependencies.Analyser, Version=2.0.0.0',
          name: 'Dependencies.Analyser.Native',
          version: '1.0.0.0',
          isNative: false,
          isSoftware: false
        }
      ]
    };

    const expectedResult = [
      { label: 'Assemblies', value: 2},
      { label: 'Native', value: 1, color: AssemblyColors.native },
      { label: 'Managed', value: 1, color: AssemblyColors.managed },
      { label: 'All References', value: 2 },
      { label: 'Direct references', value: 1 },
    ];

    expect(component.calculateStatistics(assembly)).toEqual(expectedResult);
  });
});
