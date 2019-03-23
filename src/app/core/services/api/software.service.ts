import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assembly, AssemblyBase } from '../../models/assembly';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private client: HttpClient) { }

  names(): Observable<AssemblyBase[]> {
    return this.client.get<AssemblyBase[]>('https://localhost:44394/api/software/all');
  }

  references(assemblyName: AssemblyBase): Observable<Assembly> {
    throw new Error('not implemented');
  }
}
