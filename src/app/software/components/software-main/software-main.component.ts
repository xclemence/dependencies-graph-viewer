import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { UrlService } from '@app/core/services';
import { Store } from '@ngrx/store';

import { loadSoftwareAssemblies, loadSoftwareNames } from '../../store/actions';
import { clearSoftwareAssemblies } from '../../store/actions/software-assemblies.actions';
import { SoftwareState } from '../../store/models';

@Component({
  selector: 'sft-software-main',
  templateUrl: './software-main.component.html',
  styleUrls: ['./software-main.component.scss']
})
export class SoftwareMainComponent implements OnInit {

  selectedSoftwareId?: string;

  constructor(
    private urlService: UrlService,
    private route: ActivatedRoute,
    private store: Store<SoftwareState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.onParameterChanged(params));

    this.refreshSoftwares();
  }

  private onParameterChanged(params: ParamMap): void {
    if (params.has('id')) {
      this.selectedSoftwareId = params.get('id') ?? undefined;
      this.selectedSoftwareChanged(this.selectedSoftwareId);
    } else {
      this.store.dispatch(clearSoftwareAssemblies());
    }
  }

  refreshSoftwares(): void {
    this.store.dispatch(ActionBusyAppender.executeWithMainBusy(loadSoftwareNames()));
  }

  selectedSoftwareChanged(softwareId?: string): void {
    if (!softwareId) {
      return;
    }

    this.selectedSoftwareId = softwareId;

    this.urlService.replaceSegment(1, softwareId, this.route);
    this.store.dispatch(ActionBusyAppender.executeWithBusy(loadSoftwareAssemblies({ assemblyId: softwareId }), 'SelectedSoftware'));
  }
}
