import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GraphUpdateMode } from '@app/shared/components';
import { Graph } from '@app/shared/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SoftwareReferencesComponent } from './software-references.component';

@Component({selector: 'app-assemblies-visibility', template: ''})
class AssembliesVisibilityStubComponent { 
  @Output() closed: EventEmitter<void> = new EventEmitter();
}

@Component({ selector: 'app-software-statistics', template: '' })
class SoftwareStatisticsStubComponent { }

@Component({ selector: 'app-busy', template: '' })
class BusyStubComponent {
  @Input() opacity: number;
  @Input() busyKey: string;
}

@Component({ selector: 'app-force-graph', template: '' })
class ForceGraphStubComponent {
  @Input() graph: Graph;
  @Input() updateMode: GraphUpdateMode;
}

describe('SoftwareReferencesComponent', () => {
  let component: SoftwareReferencesComponent;
  let fixture: ComponentFixture<SoftwareReferencesComponent>;
  let mockStore: MockStore;

  const initialState = {
    software: {
      assemblies: {
        software: { },
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
        MatIconModule
      ],
      declarations: [
        SoftwareReferencesComponent,
        AssembliesVisibilityStubComponent,
        SoftwareStatisticsStubComponent,
        BusyStubComponent,
        ForceGraphStubComponent
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const store = TestBed.inject(MockStore);

    expect(component).toBeTruthy();
  });
});
