import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Assembly, AssemblyBase, AssemblyColors } from '@app/core/models/assembly';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SoftwareState } from '../../store/models';
import { softwareSelector } from '../../store/software.selectors';

export interface StatValue {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'sft-software-statistics',
  templateUrl: './software-statistics.component.html',
  styleUrls: ['./software-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareStatisticsComponent implements OnInit {

  values?: Observable<StatValue[]>;

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit(): void {
    this.values = this.store.pipe(
      select(softwareSelector),
      map(x => this.calculateStatistics(x)),
    );
  }

  calculateStatistics(assembly?: Assembly): StatValue[] {

    if (!assembly) {
      return [];
    }

    return [
      { label: 'Assemblies', value: assembly.referencedAssemblies.length + 1 },
      { label: 'Native', value: this.countAssemblies(assembly, x => x.isNative), color: AssemblyColors.native },
      { label: 'Managed', value: this.countAssemblies(assembly, x => !x.isNative), color: AssemblyColors.managed },
      { label: 'All References', value: assembly.links.length },
      { label: 'Direct references', value: assembly.links.filter(x => x.sourceId === assembly.id).length },
    ];
  }

  private countAssemblies(assembly: Assembly, predicate: (x: AssemblyBase) => boolean): number {
    let value = assembly.referencedAssemblies.filter(predicate).length;
    value += predicate(assembly) ? 1 : 0;

    return value;
  }

  statVisibility(stat: StatValue): string {
    return stat.color != null ? 'inline-block' : 'none';
  }
}
