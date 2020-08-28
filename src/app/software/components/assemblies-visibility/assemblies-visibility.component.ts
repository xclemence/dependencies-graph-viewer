import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assembly } from '@app/core/models';
import { select, Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';

import { updateFilteredAssemblies } from '../../store/actions/software-assemblies.actions';
import { SoftwareState } from '../../store/models';
import { softwareAssembliesStateSelector } from '../../store/software.selectors';

export interface SelectableAssembly {
  isVisible: boolean;
  name: string;
  id: string;
}

@Component({
  selector: 'sft-assemblies-visibility',
  templateUrl: './assemblies-visibility.component.html',
  styleUrls: ['./assemblies-visibility.component.scss']
})
export class AssembliesVisibilityComponent implements OnInit {

  assemblies: SelectableAssembly[] = [];
  #currentSoftware: Assembly;

  #hoveredItemCode: string;

  @Output() closed: EventEmitter<void> = new EventEmitter();
  @Output() hoveredItem: EventEmitter<string> = new EventEmitter<string>();

  constructor(private store: Store<SoftwareState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(softwareAssembliesStateSelector),
      filter(x => (x?.software?.referencedAssemblies) && x.software !== this.#currentSoftware),
      tap(x => this.#currentSoftware = x.software),
      map(x => x.software.referencedAssemblies.map(y => ({ isVisible: !x.filteredAssemblies.includes(y.id), name: y.name, id: y.id })))
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
    collection.forEach(x => x.isVisible = newValue);

    const filteredAssemblyIds = this.assemblies.filter(x => !x.isVisible).map(x => x.id);
    this.store.dispatch(updateFilteredAssemblies({ assemblyIds: filteredAssemblyIds }));
  }

  onOverItem(value: string) {
    if (this.#hoveredItemCode === value) {
      return;
    }

    this.#hoveredItemCode = value;
    this.hoveredItem.emit(value);
  }

  close() {
    this.closed.emit();
  }
}
