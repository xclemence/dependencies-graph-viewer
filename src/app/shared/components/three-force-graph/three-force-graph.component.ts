import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { Graph } from '@app/shared/models';
import SpriteText from 'three-spritetext';

@Component({
  selector: 'dgv-threed-force-graph',
  templateUrl: './three-force-graph.component.html',
  styleUrls: ['./three-force-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeForceGraphComponent implements AfterViewInit {

  @ViewChild('container') container!: ElementRef;

  graphInstance: ForceGraph3DInstance;
  #isInitialized = false;

  #graphData: Graph;

  highlightNodes = new Set();
  highlightLinks = new Set();
  hoverNode = null;

  nodeLink = {};

  #filteredNodes: string[] = [];


  @Input() set filteredNodes(value: string[]) {
    if (this.#filteredNodes === value) {
      return;
    }
    this.#filteredNodes = value;

    this.zone.runOutsideAngular(() => this.updateGraphData());
  }

  @Input() set graph(value: Graph) {
    if (value === this.#graphData) {
      return;
    }
    this.#graphData = value;
    this.prepareNodeLink();

    this.zone.runOutsideAngular(() => {
      this.graphInstance?.graphData(this.#graphData);
    });
  }

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.initializeGraph());
  }

  private prepareNodeLink() {
    if (!this.#graphData?.links) {
      this.nodeLink = {};
      return;
    }

    this.#graphData.links.forEach(x => {
      (this.nodeLink[x.source] = this.nodeLink[x.source] || []).push(x.target);
    });
  }

  initializeGraph() {
    this.graphInstance = ForceGraph3D();
    this.graphInstance(this.container.nativeElement)
      .linkWidth((link: any) => this.isHighlightLink(this.hoverNode?.id, link.source.id, link.target.id) ? 4 : 1)
      .nodeRelSize(3)
      .nodeVisibility(x => !this.#filteredNodes.includes(x.id.toString()))
      .linkDirectionalParticles((link: any) => this.isHighlightLink(this.hoverNode?.id, link.source.id, link.target.id) ? 4 : 0)
      .backgroundColor('rgba(0,0,0,0)')
      .linkDirectionalArrowLength(8)
      .linkDirectionalArrowRelPos(1)
      .linkVisibility((x: any) => !this.#filteredNodes.includes(x.source.id) && !this.#filteredNodes.includes(x.target.id))
      .nodeColor((node: any) => {
        if (!this.isHighlightNodes(this.hoverNode?.id, node.id)) {
          return node.color;
        }
        return node === this.hoverNode ? '#afb42b' : 'rgba(255,160,0,0.8)';
      })
      .linkDirectionalParticleWidth(4)
      .nodeThreeObjectExtend(true)
      .nodeThreeObject((node: any) => {
        // add text sprite as child
        const sprite = new SpriteText(node.label);
        sprite.color = 'lightgray';
        sprite.textHeight = 5;

        sprite.translateY(6);
        return sprite;
      })
      .onNodeHover((node: any) => {
        this.container.nativeElement.style.cursor = node ? 'pointer' : null;
        this.hoverNode = node || null;

        this.updateGraphData();
      })
      .onNodeClick((node: any) => {
        // Aim at node from outside it
        const distance = 250;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        this.graphInstance.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
          node, // lookAt ({ x, y, z })
          3000  // ms transition duration
        );
      });

    this.#isInitialized = true;
    this.resizeGraph();
  }

  private isHighlightNodes(selectedNodeId: string, testNodeid: string): boolean {
    if (selectedNodeId === testNodeid) {
      return true;
    }

    return this.nodeLink[selectedNodeId]?.includes(testNodeid) ?? false;
  }

  private isHighlightLink(selectedNodeId: string, sourceId: string, targetId: string): boolean {
    if (selectedNodeId !== sourceId) {
      return false;
    }

    return this.nodeLink[sourceId]?.includes(targetId) ?? false;
  }

  private updateGraphData() {

    this.graphInstance?.nodeColor(this.graphInstance.nodeColor())
      .linkWidth(this.graphInstance.linkWidth())
      .linkDirectionalParticles(this.graphInstance.linkDirectionalParticles());
  }

  onResize() {
    this.zone.runOutsideAngular(() => this.resizeGraph());
  }

  resizeGraph() {
    if (!this.#isInitialized) {
      return;
    }

    const size = this.getControlSize();
    this.graphInstance.width(size.width);
    this.graphInstance.height(size.height);
  }

  private getControlSize(): { width: number, height: number } {
    const width = (+this.container.nativeElement.offsetWidth);
    const height = (+this.container.nativeElement.offsetHeight);

    return { width, height };
  }
}
