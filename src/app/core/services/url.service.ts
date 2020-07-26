import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: Router, private location: Location, private logService: LoggerService) { }

  replaceSegment(index: number, value: string, currentRoute: ActivatedRoute) {

    const { group: segmentGroup, tree: treeUrl } = this.getUrlSegments(currentRoute);

    if (segmentGroup.segments.length <= index) {
      segmentGroup.segments.push(new UrlSegment(value, {}));
    } else {
      segmentGroup.segments[index].path = value;
    }

    const url = this.router.serializeUrl(treeUrl);
    this.logService.log(`move ${url}`);
    this.location.replaceState(url);
  }

  moveSegment(url: string) {
    this.location.replaceState(url);
  }

  removeAt(index: number, currentRoute: ActivatedRoute) {
    const { group: segmentGroup, tree: treeUrl } = this.getUrlSegments(currentRoute);

    if (segmentGroup.segments.length >= index) {
      segmentGroup.segments.splice(index, 1);
    }

    const url = this.router.serializeUrl(treeUrl);
    this.location.replaceState(url);
  }

  getCurrentPath(): string {
    return this.location.path();
  }

  private getUrlSegments(currentRoute: ActivatedRoute): { group: UrlSegmentGroup, tree: UrlTree } {
    const currentOutlet = currentRoute.outlet;
    const treeUrl = this.router.parseUrl(this.router.url);

    return { group: treeUrl.root.children[currentOutlet], tree: treeUrl };
  }
}
