import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform<T extends {name: string}>(value: T[], nameCriteria: string): T[] {
    if (!nameCriteria) {
      return value;
    }

    const formatedNameCriteria = nameCriteria.toLowerCase();
    return value.filter(x => x.name.toLowerCase().includes(formatedNameCriteria));
  }
}
