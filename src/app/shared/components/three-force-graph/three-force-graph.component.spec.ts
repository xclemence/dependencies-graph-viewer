import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DefaultGraphLink } from '@app/shared/models';

import { StateButtonComponent } from './../state-button/state-button.component';
import { ThreeForceGraphComponent } from './three-force-graph.component';

describe('ThreeForceGraphComponent', () => {
  let component: ThreeForceGraphComponent;
  let fixture: ComponentFixture<ThreeForceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeForceGraphComponent, StateButtonComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule
      ]
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

    const updateDataSpy = spyOn<any>(component, 'refreshGraphData').and.callThrough();

    component.graph = graph;
    const filteredNodes = ['1'];

    component.filteredNodes = filteredNodes;
    component.filteredNodes = filteredNodes;
    fixture.detectChanges();

    expect(updateDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear graph data', () => {
    const graph = {
      nodes: [
        { id: '1', label: 'node1', color: 'red' },
      ],
      links: []
    };

    component.graph = graph;

    const updateDataSpy = spyOn<any>(component, 'refreshGraphData').and.callThrough();

    component.graph = undefined;

    expect(component).toBeTruthy();
  });

  it('should mask labels', fakeAsync(() => {
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
    component.displayNodeLabel = false;
    component.displayNodeLabel = false;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

  it('should update hover node', () => {
    const graph = {
      nodes: [
        { id: '1', label: 'node1', color: 'red' },
        { id: '2', label: 'node2', color: 'red' },
      ],
      links: [
        new DefaultGraphLink({ source: '1', target: '2' })
      ]
    };

    const updateDataSpy = spyOn<any>(component, 'refreshGraphData').and.callThrough();

    component.graph = graph;
    component.hoverNodeId = '1';
    fixture.detectChanges();

    expect(updateDataSpy).toHaveBeenCalled();
  });

  it('should update hover node no graph', () => {

    const updateDataSpy = spyOn<any>(component, 'refreshGraphData').and.callThrough();

    component.hoverNodeId = '1';
    fixture.detectChanges();

    expect(updateDataSpy).toHaveBeenCalled();
  });

});
