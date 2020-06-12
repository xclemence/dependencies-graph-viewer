import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

import { updateFilteredAssemblies } from '../store/actions/software-assemblies.actions';
import { SoftwareState } from '../store/models';
import { testSelector } from '../store/software.selectors';

export interface SelectableAssembly {
  isVisible: boolean;
  name: string;
  id: string;
}

@Component({
  selector: 'app-assemblies-visibility',
  templateUrl: './assemblies-visibility.component.html',
  styleUrls: ['./assemblies-visibility.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssembliesVisibilityComponent implements OnInit {

  assemblies: SelectableAssembly[] = [];

  @Output() closed: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(testSelector),
      filter(x => x !== undefined),
      map(x => x.referencedAssemblies),
      map(x => x.map(y => ({ isVisible: true, name: y.name, id: y.id})))
    ).subscribe(x => this.assemblies = x);
  }

  toggleVisibility(assembly: SelectableAssembly) {
    assembly.isVisible = !assembly.isVisible;

    const filteredAssemblyIds = this.assemblies.filter(x => !x.isVisible).map(x => x.id);
    this.store.dispatch(updateFilteredAssemblies({ assemblyIds: filteredAssemblyIds }));
  }

  isIndeterminateResult(collection: SelectableAssembly[]): boolean {
    if (!collection) {
      return false;
    }

    if (collection.length < 2) {
      return false;
    }

    const firstValue = collection[0].isVisible;

    return collection.some(x => x.isVisible !== firstValue);
  }

  isAllVisibleFilterResult(collection: SelectableAssembly[]): boolean {
    return collection?.every(x => x.isVisible) ?? false;
  }

  changeVisibility(collection: SelectableAssembly[], newValue: boolean) {
    collection?.forEach(x => x.isVisible = newValue);

    const filteredAssemblyIds = this.assemblies.filter(x => !x.isVisible).map(x => x.id);
    this.store.dispatch(updateFilteredAssemblies({ assemblyIds: filteredAssemblyIds }));
  }

  close() {
    this.closed.emit();
  }
}
