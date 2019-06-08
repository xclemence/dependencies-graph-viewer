import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewChecked } from '@angular/core';

import * as d3 from 'd3';
import { Simulation } from 'd3';

import { Graph, Node, Link } from '@app/shared/models';

export enum GraphUpdateMode {
  Update = 'Update',
  ClearAndAdd = 'ClearAndAdd'
}

@Component({
  selector: 'app-force-graph',
  templateUrl: './force-graph.component.html',
  styleUrls: ['./force-graph.component.scss']
})
export class ForceGraphComponent implements OnInit, AfterViewChecked {

  private _isInitialized = false;
  private _simulation: Simulation<{}, undefined>;

  private _graph: Graph;
  private _linkedByIndex = {};

  private _nodes: any = null;
  private _links: any;

  private _svg: any;
  private _svgGroup: any;

  private _height: number;
  private _width: number;

  @ViewChild('container', { static: true }) private container: ElementRef;

  @Input() public disableOpacity = 0.3;
  @Input() public markerSize = 12;
  @Input() public linkStroke = 1.5;
  @Input() public circleSize = 6;
  @Input() public updateMode = GraphUpdateMode.Update;

  @Input() set graph(value: Graph) {
    if (value === this._graph) {
      return;
    }
    this._graph = value;
    this.generateGraphData();
  }

  private get nodeSelector(): any {
    return this._svgGroup.attr('class', 'nodes').selectAll('g');
  }

  private get linkSelector(): any {
    return this._svgGroup.attr('class', 'links').selectAll('line');
  }

  constructor() { }

  ngOnInit() {
    console.log('D3.js version:', d3.version);
    this.initializeGraph();
  }

  ngAfterViewChecked(): void {
    this.onResize();
  }

  private initializeGraph() {

    if (this._isInitialized) {
      return;
    }

    this._isInitialized = true;

    this._svg = d3.select('svg');
    const size = this.getControlSize();

    this._height = size.height;
    this._width = size.width;

    this._svg.attr('width', this._width);
    this._svg.attr('height', this._height);

    this._simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(200))
      .force('collide', d3.forceCollide(this.circleSize * 1.5).iterations(16))
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(this._width / 2, this._height / 2));

    this._svgGroup = this._svg.append('g');

    this._svg.append('defs')
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', this.markerSize)
            .attr('markerHeight', this.markerSize)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('stroke', 'none')
            .attr('fill', 'DimGray');

    const zoom_handler = d3.zoom().on('zoom', () => this._svgGroup.attr('transform', d3.event.transform));
    zoom_handler(d3.select('svg'));
  }

  private generateGraphData() {

    if (!this._isInitialized) {
      this.initializeGraph();
    }

    if (this._graph == null || this.updateMode === GraphUpdateMode.ClearAndAdd) {
      this.clearData();
    }

    if (this._graph == null) {
      this._simulation.restart();
      return;
    }

    this._linkedByIndex = {};

    this._graph.links.forEach(d => {
      this._linkedByIndex[`${d.source},${d.target}`] = true;
    });

    const linkData = this.linkSelector.data(this._graph.links, (x: Link) => `${x.source}|${x.target}`);

    linkData.exit().remove();

    this._links = linkData.enter()
                          .append('line')
                          .attr('marker-end', 'url(#arrowhead)')
                          .style('stroke-width', this.linkStroke)
                          .style('stroke', 'DimGray');

    let nodes = this.nodeSelector.data(this._graph.nodes, (x: Node) => x.id);

    nodes.exit().remove();

    nodes = nodes.enter().append('g');

    nodes.append('circle')
               .attr('stroke', (d: Node) => d.color)
               .attr('stroke-width', this.circleSize / 2.0)
               .attr('fill', (d: Node) => d.color)
               .attr('r', this.circleSize);

    nodes.append('text')
              .text((d: Node) => d.label)
              .attr('font-size', 15)
              .attr('fill', 'white')
              .attr('dx', 15)
              .attr('dy', 4);

    this._nodes = this.nodeSelector;

    // Here we need the real item
    this._nodes.on('mouseover.fade', this.fade(this.disableOpacity))
               .on('mouseout.fade', this.fade(1));

    this._simulation.nodes(this._graph.nodes).on('tick', () => this.ticked());

    this._nodes.call(d3.drag().on('start', d => this.dragstarted(d, this._simulation))
                              .on('drag', this.dragged)
                              .on('end', d => this.dragended(d, this._simulation)));

    this._simulation.force<d3.ForceLink<any, any>>('link').links(this._graph.links);
    this._simulation.alphaTarget(0.3).restart();
  }

  clearData() {
    if (this.nodeSelector != null) {
      this.nodeSelector.data({}).exit().remove();
      this.linkSelector.data({}).exit().remove();
    }
  }

  ticked() {
    this._links
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);

    this._nodes.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
  }

  isConnected(a: Node, b: Node) {
    return this._linkedByIndex[`${a.id},${b.id}`] || a.id === b.id;
  }

  fade(opacity: number) {
    return (d: any) => {
      this._nodes.style('opacity', (o: any) => this.isConnected(d, o) ? 1 : opacity);
      this._links.style('opacity', (o: any) => (o.source === d ? 1 : opacity));
    };
  }

  dragstarted(d: any, simulation: any) {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
    }

    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d: any) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d: any, simulation: any) {
    if (!d3.event.active) {
      simulation.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
  }

  onResize() {
    const size = this.getControlSize();

    if (this._height === size.height && this._width === size.width) {
      return;
    }

    this._height = size.height;
    this._width = size.width;

    this._svg.attr('width', this._width);
    this._svg.attr('height', this._height);

    this._simulation = this._simulation.force('center', d3.forceCenter(this._width / 2, this._height / 2));
    this._simulation.restart();
  }

  getControlSize(): {width: number, height: number} {
    const width = (+this.container.nativeElement.offsetWidth);
    const height = (+this.container.nativeElement.offsetHeight);

    return {width, height};
  }

}
