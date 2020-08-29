import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { Graph } from '@app/shared/models';
import { first } from 'rxjs/operators';
import { MOUSE, Object3D } from 'three';
import SpriteText from 'three-spritetext';

@Component({
  selector: 'dgv-three-force-graph',
  templateUrl: './three-force-graph.component.html',
  styleUrls: ['./three-force-graph.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeForceGraphComponent implements AfterViewInit {

  @ViewChild('container') container!: ElementRef;

  #selectionColor = 'rgba(175, 180, 43, 1)';
  #linkSelectionColor = 'rgba(255, 160, 0, 0.6)';

  #graphInstance: ForceGraph3DInstance;
  #isInitialized = false;
  #graphData: Graph;
  #hoverNode = null;
  #nodeLink = {};
  #filteredNodes: string[] = [];
  #displayNodeLabel = true;

  @Input() set hoverNodeId(id: string) {
    this.#hoverNode = id ? this.#graphData?.nodes.find(x => x.id === id) : null;
    this.zone.runOutsideAngular(() => this.refreshGraphData());
  }

  @Input() set displayNodeLabel(value: boolean) {
    if (this.#displayNodeLabel === value) {
      return;
    }
    this.#displayNodeLabel = value;

    this.zone.runOutsideAngular(() => {
      this.#graphInstance?.nodeLabel((node: any) => this.getNodeLabel(node))
        .nodeThreeObject((node: any) => this.getNodeExtendObject(node));
    });
  }

  get displayNodeLabel(): boolean {
    return this.#displayNodeLabel;
  }

  @Input() set filteredNodes(value: string[]) {
    if (this.#filteredNodes === value) {
      return;
    }
    this.#filteredNodes = value;
    this.zone.runOutsideAngular(() => this.refreshGraphData());
  }

  @Input() set graph(value: Graph) {
    if (value === this.#graphData) {
      return;
    }
    this.#graphData = value;
    this.prepareNodeLink();

    this.updateGraphWithData();
  }

  @Output() labelVisibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.initializeGraph());
  }

  private prepareNodeLink() {
    if (!this.#graphData?.links) {
      this.#nodeLink = {};
      return;
    }

    this.#graphData.links.forEach(x => {
      (this.#nodeLink[x.source] = this.#nodeLink[x.source] || []).push(x.target);
    });
  }

  private getNodeColor(node: any) {
    if (!this.isHighlightNodes(this.#hoverNode?.id, node.id)) {
      return node.color;
    }
    return node === this.#hoverNode ? this.#selectionColor : this.#linkSelectionColor;
  }

  private getNodeLabel(node: any): any {
    return this.#displayNodeLabel ? undefined : node.label;
  }

  private getNodeExtendObject(node: any): Object3D {
    if (!this.#displayNodeLabel) {
      return null;
    }

    const sprite = new SpriteText(node.label);
    sprite.color = 'lightgray';
    sprite.textHeight = 5;

    sprite.translateY(6);
    return sprite;
  }

  private onNodeHover(node: any) {
    this.container.nativeElement.style.cursor = node ? 'pointer' : null;
    this.#hoverNode = node || null;

    this.refreshGraphData();
  }

  private onNodeClick(node: any) {
    const distance = 250;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    this.#graphInstance.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }

  private initializeGraph() {
    this.#graphInstance = ForceGraph3D( { controlType: 'orbit' });
    this.#graphInstance(this.container.nativeElement)
      .backgroundColor('rgba(0,0,0,0)')
      .showNavInfo(false)
      .nodeRelSize(3)
      .nodeVisibility(x => !this.#filteredNodes.includes(x.id.toString()))
      .nodeLabel((x: any) => this.#displayNodeLabel ? undefined : x.label)
      .nodeColor((node: any) => this.getNodeColor(node))
      .nodeThreeObjectExtend(true)
      .nodeThreeObject((node: any) => this.getNodeExtendObject(node))
      .linkWidth((link: any) => this.isHighlightLink(link) ? 4 : 1)
      .linkDirectionalParticles((link: any) => this.isHighlightLink(link) ? 4 : 0)
      .linkDirectionalArrowLength(8)
      .linkDirectionalArrowRelPos(1)
      .linkDirectionalParticleWidth(4)
      .linkVisibility((x: any) => !this.#filteredNodes.includes(x.source.id) && !this.#filteredNodes.includes(x.target.id))
      .onNodeHover((node: any) => this.onNodeHover(node))
      .onNodeClick((node: any) => this.onNodeClick(node));

    this.configureControls();

    this.#isInitialized = true;

    this.updateGraphWithData();

    this.zone.onStable.pipe(first()).subscribe(x => this.onResize());
  }

  private configureControls() {
    const orbitControl = this.#graphInstance.controls() as any;

    orbitControl.zoomSpeed = 3;

    orbitControl.mouseButtons = {
      LEFT: MOUSE.PAN,
      RIGHT: MOUSE.ROTATE,
      MIDELE: undefined,
    };
  }

  private updateGraphWithData() {
    if (!this.#graphData) {
      return;
    }
    this.zone.runOutsideAngular(() => this.#graphInstance?.graphData(this.#graphData));
  }

  private isHighlightLink(link: any): boolean {

    if (this.#hoverNode?.id !== link.source.id) {
      return false;
    }

    return this.#nodeLink[link.source.id]?.includes(link.target.id) ?? false;
  }

  private isHighlightNodes(selectedNodeId: string, testNodeid: string): boolean {
    if (selectedNodeId === testNodeid) {
      return true;
    }

    return this.#nodeLink[selectedNodeId]?.includes(testNodeid) ?? false;
  }

  private refreshGraphData() {

    this.#graphInstance?.nodeColor(this.#graphInstance.nodeColor())
      .linkWidth(this.#graphInstance.linkWidth())
      .linkDirectionalParticles(this.#graphInstance.linkDirectionalParticles());

  }

  onResize() {
    this.zone.runOutsideAngular(() => this.resizeGraph());
  }

  resizeGraph() {
    if (!this.#isInitialized) {
      return;
    }

    const size = this.getControlSize();

    this.#graphInstance.width(size.width);
    this.#graphInstance.height(size.height);
  }

  private getControlSize(): { width: number, height: number } {
    const width = (+this.container.nativeElement.offsetWidth);
    const height = (+this.container.nativeElement.offsetHeight);

    return { width, height };
  }

  toggleNodesVisibility() {
    this.displayNodeLabel = !this.#displayNodeLabel;
    this.labelVisibilityChange.emit(this.#displayNodeLabel);
  }

  zoomToFit() {
    this.#graphInstance.zoomToFit();
  }
}
