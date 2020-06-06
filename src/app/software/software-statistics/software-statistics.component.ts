import { Component, OnInit } from '@angular/core';
import { Assembly } from '@app/core/models/assembly';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../store/models';
import { softwareAssembliesStateSelector } from '../store/software.selectors';

export class StatValue {
  label: string;
  value: number;
  color?: string = null;

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

  values: Observable<StatValue[]>;

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.values = this.store.pipe(
      select(softwareAssembliesStateSelector),
      map(x => this.updateStatistics(x.software)),
    );
  }

  updateStatistics(assembly: Assembly): StatValue[] {

    if (assembly == null) {
      return [];
    }

    return [
      { label: 'Assemblies', value: assembly.referencedAssemblies.length + 1},
      { label: 'Native', value: this.countAssemblies(assembly, x => x.isNative), color: 'lightGreen'},
      { label: 'Managed', value: this.countAssemblies(assembly, x => !x.isNative), color: 'lightBlue'},
      { label: 'All References', value: assembly.links.length},
      { label: 'Direct references', value: assembly.links.filter(x => x.sourceId === assembly.id).length},
    ];
  }

  countAssemblies(assembly: Assembly, predicate: (x: Assembly) => boolean): number  {
    let value = assembly.referencedAssemblies.filter(predicate).length;
    value += predicate(assembly) ? 1 : 0;

    return value;
  }

  statVisibility(stat: StatValue): string {
    return stat.color != null ? 'inline-block' : 'none';
  }
}
