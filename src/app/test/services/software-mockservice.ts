import { Injectable } from '@angular/core';
import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { AssemblyMockProvider } from '@app/test/assembly.mock-provider';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class SoftwareMockService {

  constructor(private provider: AssemblyMockProvider) { }

  names(): Observable<AssemblyBase[]> {
    const jsonData = [
      {id: '1', name: 'Assembly1', version: '1.0.0'},
      {id: '2', name: 'Assembly2', version: '1.2.0'},
      {id: '3', name: 'Assembly3', version: '1.0.3'},
      {id: '4', name: 'Assembly3', version: '1.0.3'},
      {id: '5', name: 'Assembly3', version: '1.0.3'},
      {id: '6', name: 'Assembly3', version: '1.0.3'},
      {id: '7', name: 'Assembly3', version: '1.0.3'},
      {id: '8', name: 'Assembly3', version: '1.0.3'},
      {id: '9', name: 'Assembly3', version: '1.0.3'},
      {id: '10', name: 'Assembly3', version: '1.0.3'},
      {id: '11', name: 'Assembly3', version: '1.0.3'},
      {id: '12', name: 'Assembly3', version: '1.0.3'},
      {id: '13', name: 'Assembly3', version: '1.0.3'},
      {id: '14', name: 'Assembly3', version: '1.0.3'},
      {id: '15', name: 'Assembly3', version: '1.0.3'},
    ];

    return of(jsonData as AssemblyBase[] ).pipe(delay(1000));
  }

  references(assemblyName: AssemblyBase): Observable<Assembly> {
    return of(this.provider.getMockDataRand(75)).pipe(delay(500));
  }
}
