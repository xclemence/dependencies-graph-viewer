import { Injectable } from '@angular/core';
import { SortDirection } from '@app/shared/models';

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


  #sortTypeMapping: { [char: string]: SortDirection } = {
    ['asc']: 'ASC',
    ['desc']: 'DESC',
    ['']: 'ASC',
  };

  getAssemblyServiceOrder(field: string | undefined , order: string | undefined): {[key:string]: SortDirection} {
    const currentField = field ?? 'name';
    const currentOrder = order ?? 'asc';

    return this.generateFinalOrder(this.#fieldMapping[currentField], this.#sortTypeMapping[currentOrder]);
  }

  private generateFinalOrder(field: string, order: SortDirection): {[key:string]: SortDirection} {
    if (!field) {
      return {};
    }

    return {
      [field]: order
    };
  }
}
