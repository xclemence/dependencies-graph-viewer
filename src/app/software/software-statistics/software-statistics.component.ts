import { Component, OnInit, Input } from '@angular/core';
import { AssemblyLink, Assembly } from '@app/core/models/assembly';

export class StatValue {
  label: string;
  value: number;
  color: string = null;

  public constructor(init?: Partial<StatValue>) {
    Object.assign(this, init);
  }
}

@Component({
  selector: 'app-software-statistics',
  templateUrl: './software-statistics.component.html',
  styleUrls: ['./software-statistics.component.scss']
})
export class SoftwareStatisticsComponent implements OnInit {
  private _software: Assembly;

  values: StatValue[];

  @Input() set software(value: Assembly) {

    if (value === this._software) {
      return;
    }

    this._software = value;
    this.updateStatistics();
  }

  constructor() { }

  ngOnInit() {
  }

  updateStatistics() {
    if (this.values != null) {
      this.values.splice(0, this.values.length);
    }

    if (this._software == null) {
      return;
    }

    this.values = <StatValue[]> [
      { label: 'Assemblies', value: this._software.referencedAssemblies.length + 1},
      { label: 'Native', value: this.countAssemblies(x => x.isNative), color: 'lightGreen'},
      { label: 'Managed', value: this.countAssemblies(x => !x.isNative), color: 'lightBlue'},
      { label: 'System', value: this.countAssemblies(x => x.isSystem)},
      { label: 'All References', value: this._software.links.length},
      { label: 'Direct references', value: this._software.links.filter(x => x.sourceId === this._software.id).length},
    ];
  }

  countAssemblies(predicate: (x: Assembly) => boolean): number  {
    let value = this._software.referencedAssemblies.filter(predicate).length;
    value += predicate(this._software) ? 1 : 0;

    return value;
  }

  countLinks(predicate: (x: AssemblyLink) => boolean): number  {
    return this._software.links.filter(predicate).length;
  }

  statVisibility(stat: StatValue): string {
    return stat.color != null ? 'inline-block' : 'none';
  }
}
