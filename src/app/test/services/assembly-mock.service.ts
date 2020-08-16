import { Injectable } from '@angular/core';
import { Assembly, AssemblyStat } from '@app/core/models';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { appendAssemblyReference, defaultDelay } from './assembly-mock';
import { assemblyData } from './asssembly-data';

@Injectable()
export class AssemblyMockService {

  saveAssembly = new Map<string, Assembly>();

  assemblyStatistics(pageSize: number, page: number, namefilter: string, order: string)
    : Observable<{ assemblies: AssemblyStat[], count: number }> {

    const items = assemblyData.filter(x => !namefilter || x.name.includes(namefilter))
                              .sort(x => x[order])
                              .slice(pageSize * page, pageSize * page + pageSize)
                              .map(x => ({ ...x }) as AssemblyStat);

    return of({
      assemblies: items,
      count: assemblyData.length
    }).pipe(delay(defaultDelay));
  }

  references(id: string, depth: number): Observable<Assembly> {

    const baseAssembly = assemblyData.find(x => x.id === id);

    const assembly = {
      ...baseAssembly,
      referencedAssemblies: [],
      links: []
    } as Assembly;

    appendAssemblyReference(assembly, assembly.id, depth);

    return of(assembly).pipe(delay(defaultDelay));
  }

  remove(id: string): Observable<string> {
    const index = assemblyData.findIndex(x => x.id === id);

    if (index > -1) {
      assemblyData.splice(index, 1);
    }

    return of(id).pipe(delay(defaultDelay));
  }
}
