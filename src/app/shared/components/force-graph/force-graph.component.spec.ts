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
      nodes: [],
      links: []
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
        new GraphLink({ source: '1', target: '2' })
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
      links: []
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
      links: []
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const newGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
        new GraphNode({ id: '2', label: 'node2', color: 'red' }),
      ],
      links: [
        new GraphLink({ source: '1', target: '2' })
      ]
    };
    component.graph = newGraph;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('circle')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('line')).length).toBe(1);
  });

  it('should update graph with clean mode', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: []
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
        new GraphLink({ source: '1', target: '2' })
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
      links: []
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

  it('should highlight selected node', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '2', label: 'node1', color: 'red' }),
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: []
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const selectedNode = fixture.debugElement.queryAll(By.css('.nodes>g'))[0];

    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mouseover'));

    const allNodeElements = fixture.debugElement.queryAll(By.css('.nodes>g'));

    expect(allNodeElements[0].nativeElement.style.opacity).toBe('1');
    expect(allNodeElements[1].nativeElement.style.opacity).toBe(`${component.disableOpacity}`);
  });

  it('should reset selection on mouse out', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '2', label: 'node1', color: 'red' }),
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: []
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const selectedNode = fixture.debugElement.queryAll(By.css('.nodes>g'))[0];

    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mouseover'));
    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mouseout'));

    const allNodeElements = fixture.debugElement.queryAll(By.css('.nodes>g'));

    expect(allNodeElements[0].nativeElement.style.opacity).toBe('1');
    expect(allNodeElements[1].nativeElement.style.opacity).toBe(`1`);
  });

  it('should highlight selected node and referenced nodes', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
        new GraphNode({ id: '2', label: 'node2', color: 'red' }),
        new GraphNode({ id: '3', label: 'node3', color: 'red' }),
      ],
      links: [
        new GraphLink({ source: '1', target: '2' }),
        new GraphLink({ source: '2', target: '3' })
      ]
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const selectedNode = fixture.debugElement.queryAll(By.css('.nodes>g'))[0];

    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mouseover'));

    const allNodeElements = fixture.debugElement.queryAll(By.css('.nodes>g'));

    expect(allNodeElements[0].nativeElement.style.opacity).toBe('1');
    expect(allNodeElements[1].nativeElement.style.opacity).toBe(`1`);
    expect(allNodeElements[2].nativeElement.style.opacity).toBe(`${component.disableOpacity}`);

    const allLinkElements = fixture.debugElement.queryAll(By.css('g.links>line'));

    expect(allLinkElements[0].nativeElement.style.opacity).toBe('1');
    expect(allLinkElements[1].nativeElement.style.opacity).toBe(`${component.disableOpacity}`);
  });

  it('should call drag and drop methods', () => {
    const baseGraph = {
      nodes: [
        new GraphNode({ id: '1', label: 'node1', color: 'red' }),
      ],
      links: []
    };

    component.graph = baseGraph;
    fixture.detectChanges();

    const dragStartedSpy = spyOn<any>(component, 'dragStarted').and.callThrough();
    const dragEndedSpy = spyOn<any>(component, 'dragEnded').and.callThrough();

    const selectedNode = fixture.debugElement.queryAll(By.css('.nodes>g'))[0];

    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: false, view: window }));
    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mousemove'));
    selectedNode.nativeElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: false, view: window }));

    expect(dragStartedSpy).toHaveBeenCalled();
    expect(dragEndedSpy).toHaveBeenCalled();
  });

});
