import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortDefinitionConvertorService {
  #fieldMapping = {
    ['type']: 'isNative',
    ['name']: 'shortName',
    ['version']: 'version',
    ['depth']: 'maxDepth',
    ['links']: 'directReferenceCount'
  };

  #sortTypeMapping = {
    ['asc']: 'asc',
    ['desc']: 'desc',
  };

  getAssemblyServiceOrder(field: string, order: string): string {
    let currentField = field;
    let currentOrder = order;

    if (!order){
      currentOrder = 'asc';
      currentField = 'name';
    }

    return this.generateFinalOrder(this.#fieldMapping[currentField], this.#sortTypeMapping[currentOrder]);
  }

  private generateFinalOrder(field: string, order: string): string {
    return `${field}_${order}`;
  }
}
