import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GraphLink, GraphNode } from '@app/shared/models';

import { ForceGraphComponent, GraphUpdateMode } from './force-graph.component';

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


  it('should not re create graph if same graph object', () => {
    const graph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: [ ]
    };

    component.graph = graph;
    fixture.detectChanges();

    graph.nodes.push(new GraphNode({ id: '3', label: 'node3' }));

    component.graph = graph; // No Changed
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(1);
  });

  it('should update graph', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: [ ]
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const newGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
        new GraphNode({ id: '2', label: 'node2', color: 'red' }),
      ],
      links: [
        new GraphLink({source: '1', target: '2'})
       ]
    };
    component.graph = newGraph;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('line')).length).toBe(1);
  });

  it('should update graph whith clean mode', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: [ ]
    };

    component.updateMode = GraphUpdateMode.ClearAndAdd;
    component.graph = baseGraph;
    fixture.detectChanges();

    const newGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
        new GraphNode({ id: '2', label: 'node2', color: 'red' }),
      ],
      links: [
        new GraphLink({source: '1', target: '2'})
       ]
    };
    component.graph = newGraph;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('line')).length).toBe(1);
  });

  it('should remove graph', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: [ ]
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    component.graph = null;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('line')).length).toBe(0);
  });

  it('should trigger onResize method when window is resized', () => {
    const spyOnResize = spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  });

  it('should resize control window is resized', () => {

    viewport.set(320, 480);

    fixture.detectChanges();

    const svgElement = fixture.debugElement.query(By.css('.graph-svg')).nativeElement;

    const resultWidth = svgElement.width.baseVal.value;
    const resultHeight = svgElement.height.baseVal.value;

    const referenceWith = fixture.nativeElement.offsetWidth;
    const referenceHeight = fixture.nativeElement.offsetHeight;

    viewport.reset();

    expect(resultWidth).toBe(referenceWith);
    expect(resultHeight).toBe(referenceHeight);

  });

  it('should update circle state on move over', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '2', label: 'node1', color: 'red' }),
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: [ ]
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('circle'));

    element.triggerEventHandler('mouseover', {});
    fixture.detectChanges();

    const nodeContentElements = fixture.debugElement.queryAll(By.css('.nodes>g'));

    // console.log(nodeContentElements[0].nativeElement.constructor);
    // expect(nodeContentElements[0].nativeElement.style.opacity).toBe(1);
    // expect(nodeContentElements[1].nativeElement.style.opacity).toBe(component.disableOpacity);
  });

});
