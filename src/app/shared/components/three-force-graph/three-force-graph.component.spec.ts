import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StateButtonComponent } from './../state-button/state-button.component';
import { ThreeForceGraphComponent } from './three-force-graph.component';

describe('ThreeForceGraphComponent', () => {
  let component: ThreeForceGraphComponent;
  let fixture: ComponentFixture<ThreeForceGraphComponent>;

  beforeEach(waitForAsync(() => {
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
    const node1 = { id: '1', label: 'node1', color: 'red' };
    const node2 = { id: '2', label: 'node2', color: 'red' };

    const graph = {
      nodes: [ node1, node2 ],
      links: [
        { source: node1, target: node2, value: 10 }
      ]
    };

    component.graph = graph;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create graph with filtered node', () => {

    const node1 = { id: '1', label: 'node1', color: 'red' };
    const node2 = { id: '2', label: 'node2', color: 'red' };

    const graph = {
      nodes: [ node1, node2 ],
      links: [
        { source: node1, target: node2, value: 10 }
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
    const node1 = { id: '1', label: 'node1', color: 'red' };
    const node2 = { id: '2', label: 'node2', color: 'red' };

    const graph = {
      nodes: [ node1, node2 ],
      links: [
        { source: node1, target: node2, value: 10 }
      ]
    };

    component.graph = graph;
    component.displayNodeLabel = false;
    component.displayNodeLabel = false;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

  it('should update hover node', () => {
    const node1 = { id: '1', label: 'node1', color: 'red' };
    const node2 = { id: '2', label: 'node2', color: 'red' };

    const graph = {
      nodes: [ node1, node2 ],
      links: [
        { source: node1, target: node2, value: 10 }
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

  it('should change label visibility value and emit new value', () => {
    component.displayNodeLabel = false;
    const emitSpy = spyOn(component.labelVisibilityChange, 'emit');

    component.toggleNodesVisibility();

    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(component.getdisplayNodeLabel()).toBeTrue();
  });

});
