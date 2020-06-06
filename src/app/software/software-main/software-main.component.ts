import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { AssemblyBase } from '@app/core/models/assembly';
import { UrlService } from '@app/core/services';
import { Store } from '@ngrx/store';

import { loadSoftwareAssemblies, loadSoftwareNames } from '../store/actions';
import { SoftwareState } from '../store/models';
import { clearSoftwareAssemblies } from './../store/actions/software-assemblies.actions';

@Component({
  selector: 'app-software-main',
  templateUrl: './software-main.component.html',
  styleUrls: ['./software-main.component.scss']
})
export class SoftwareMainComponent implements OnInit {

  selectedSoftwareId: string;

  constructor(private urlService: UrlService,
    private route: ActivatedRoute,
    private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.onParameterChanged(params));

    this.store.dispatch(ActionBusyAppender.executeWithMainBusy(loadSoftwareNames()));
  }

  private onParameterChanged(params: ParamMap) {
    if (params.has('id')) {
      this.selectedSoftwareId = params.get('id');
    } else {
      this.store.dispatch(clearSoftwareAssemblies());
    }
  }

  selectedSoftwareChanged(software: AssemblyBase) {
    if (software !== undefined) {
      this.urlService.replaceSegment(1, software.id.toString(), this.route);
      this.store.dispatch(ActionBusyAppender.executeWithBusy(loadSoftwareAssemblies({ assemblyName: software }), 'SelectedSoftware'));
    }
  }
}
