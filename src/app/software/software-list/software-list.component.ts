import { BusyService } from '@app/core/services/tech/busy.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SoftwareService } from '@app/core/services/api';
import { SoftwareMockService } from '@app/core/services/api/software-mock.service';
import { MatSelectionList } from '@angular/material';
import { AssemblyBase } from '@app/core/models/assembly';
import '@app/core/extensions/observable-busy';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss'],
  providers: [
    {provide: SoftwareService, useClass: SoftwareMockService}
  ]
})
export class SoftwareListComponent implements OnInit {

  @ViewChild('selectionList', { static: true }) selectionList: MatSelectionList;
  @Output() selectionChange: EventEmitter<AssemblyBase> = new EventEmitter();
  @Input() selectedId: string;

  public softwareNames: AssemblyBase[];

  public selectedSoftwares = new Array<AssemblyBase>();

  constructor(private softwareService: SoftwareService, private busyService: BusyService) { }

  ngOnInit() {
    this.softwareService.names()
                        .executeWithMainBusy(this.busyService)
                        .subscribe(x => {
                          this.softwareNames = x;
                          this.refreshSelection();
                        });

    (<any>this.selectionList.selectedOptions)._multiple = false;
  }

  refreshSelection() {
    this.selectedSoftwares = this.softwareNames.filter(x => x.id === this.selectedId);
    this.selectionChanged();
  }

  selectionChanged() {
    this.selectionChange.emit(this.selectedSoftwares[0]);
  }
}
