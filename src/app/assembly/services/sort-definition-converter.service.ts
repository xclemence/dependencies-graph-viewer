import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortDefinitionConverterService {
  #fieldMapping: { [char: string]: string } = {
    ['type']: 'isNative',
    ['name']: 'shortName',
    ['version']: 'version',
    ['depth']: 'maxDepth',
    ['links']: 'directReferenceCount',
    ['']: 'shortName'
  };

  #sortTypeMapping: { [char: string]: string } = {
    ['asc']: 'asc',
    ['desc']: 'desc',
    ['']: 'asc',
  };

  getAssemblyServiceOrder(field: string | undefined , order: string | undefined): string {
    const currentField = field ?? 'name';
    const currentOrder = order ?? 'asc';

    return this.generateFinalOrder(this.#fieldMapping[currentField], this.#sortTypeMapping[currentOrder]);
  }

  private generateFinalOrder(field: string, order: string): string {
    return `${field}_${order}`;
  }
}
