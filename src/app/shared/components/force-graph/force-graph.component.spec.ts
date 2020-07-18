import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GraphLink, GraphNode } from '@app/shared/models';

import { ForceGraphComponent } from './force-graph.component';

describe('ForceGraphComponent', () => {
  let component: ForceGraphComponent;
  let fixture: ComponentFixture<ForceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [ForceGraphComponent],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an empty graph force', () => {
    const graph = {
      nodes: [ ],
      links: [ ]
    };

    component.graph = graph;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('line')).length).toBe(0);
  });

  it('should create a graph force', () => {
    const graph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
        new GraphNode({ id: '2', label: 'node2', color: 'red' }),
      ],
      links: [
        new GraphLink({source: '1', target: '2'})
      ]
    };

    component.graph = graph;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('line')).length).toBe(1);
  });

});
