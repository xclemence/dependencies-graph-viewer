import { Injectable } from '@angular/core';
import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { assemblyData } from './assembly-data';
import { appendAssemblyReference, defaultDelay } from './assembly-mock';

@Injectable()
export class SoftwareMockService {

  names(): Observable<AssemblyBase[]> {
    const data = assemblyData.filter(x => x.isSoftware).map(x => x as AssemblyBase);

    return of(data).pipe(delay(defaultDelay));
  }

  software(assemblyName: AssemblyBase): Observable<Assembly> {
    const baseAssembly = assemblyData.find(x => x.id === assemblyName.id);

    const assembly = {
      ...baseAssembly,
      referencedAssemblies: [],
      links: []
    } as Assembly;

    appendAssemblyReference(assembly, assembly.id, -1);

    return of(assembly).pipe(delay(defaultDelay));
  }
}
