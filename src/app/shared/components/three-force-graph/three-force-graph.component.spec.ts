import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultGraphLink } from '@app/shared/models';

import { ThreeForceGraphComponent } from './three-force-graph.component';

describe('ThreeForceGraphComponent', () => {
  let component: ThreeForceGraphComponent;
  let fixture: ComponentFixture<ThreeForceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeForceGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeForceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create graph with data', () => {
    const graph = {
      nodes: [
        { id: '1', label: 'node1', color: 'red' },
        { id: '2', label: 'node2', color: 'red' },
      ],
      links: [
        new DefaultGraphLink({ source: '1', target: '2' })
      ]
    };

    component.graph = graph;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create graph with filtered node', () => {
    const graph = {
      nodes: [
        { id: '1', label: 'node1', color: 'red' },
        { id: '2', label: 'node2', color: 'red' },
      ],
      links: [
        new DefaultGraphLink({ source: '1', target: '2' })
      ]
    };

    component.graph = graph;
    component.filteredNodes = ['1'];
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
