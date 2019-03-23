import { AssemblyBase } from '@app/core/models/assembly';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { UrlService } from '@app/core/services/tech';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {

  currentSoftware: AssemblyBase;
  selectedSoftwareId: string;

  constructor(private urlService: UrlService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.selectedSoftwareId = params.get('id');
      }
    });
  }

  selectedSoftwareChanged(software: AssemblyBase) {
    this.currentSoftware = software;
    if (software !== undefined) {
      this.urlService.replaceSegment(1, software.id.toString(), this.route);
    }
  }
}
