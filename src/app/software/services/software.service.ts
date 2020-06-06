import { Injectable } from '@angular/core';
import { AssemblyConverter } from '@app/core/converters';
import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { flatMap, map, toArray } from 'rxjs/operators';

const getSoftwareNames = gql`
  query softwareNames {
    Software {
        name,
        version,
        shortName
    }
  }
`;

const getSoftwareAssemblies = gql`
  query softwareAssemblies($assemblyId: String!) {
    Assembly(filter: { name: $assemblyId }){
      name,
      shortName,
      isNative,
      version,
      allReferencedAssemblies {
        name,
        shortName,
        isNative,
        version,
      },
      allReferencedAssemblIesLinks {source, target}
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private appoloService: Apollo) { }

  names(): Observable<AssemblyBase[]> {
    return this.appoloService.query({ query: getSoftwareNames }).pipe(
      flatMap((x: any) => x.data.Software),
      map((x: any) => AssemblyConverter.toAssemblyBase<AssemblyBase>(x)),
      toArray()
    );
  }

  references(assemblyName: AssemblyBase): Observable<Assembly> {
    return this.appoloService.query({ query: getSoftwareAssemblies, variables: { assemblyId: assemblyName.id } }).pipe(
      map((x: any) => x.data.Assembly[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }
}
