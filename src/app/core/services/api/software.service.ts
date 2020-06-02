import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assembly, AssemblyBase, AssemblyLink } from '../../models/assembly';
import { map, flatMap, toArray } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
      allReferencedAssemblies {
        name,
        shortName,
        isNative,
        directReferencedAssemblies {
        	name
        },
      },
      directReferencedAssemblies {
        name
      }
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
      map((x: any) => this.toAssemblyBase<AssemblyBase>(x)),
      toArray()
    );
  }

  references(assemblyName: AssemblyBase): Observable<Assembly> {
    return this.appoloService.query({ query: getSoftwareAssemblies, variables: { assemblyId: assemblyName.id } }).pipe(
      map((x: any) => x.data.Assembly[0]),
      map((x: any) => this.toAssembly(x))
    );
  }

  toAssemblyBase<T extends AssemblyBase>(item: any): T {
    return <T> { id: item.name, version: item.version, name: item.shortName, isNative: item.isNative };
  }

  toAssembly(item: any): Assembly {
    
    const assembly = this.toAssemblyBase<Assembly>(item);

    assembly.referencedAssemblies = item.allReferencedAssemblies.map((x: any) => this.toAssemblyBase<AssemblyBase>(x));

    assembly.links = [
      ...this.toAssemblyLinks(assembly.id, item.directReferencedAssemblies),
      ...item.allReferencedAssemblies.flatMap(x => this.toAssemblyLinks(x.name, x.directReferencedAssemblies))
    ];

    return assembly;
  }

  toAssemblyLinks(sourceId: any, items: any): AssemblyLink[] {
    return items.map(x => <AssemblyLink> { sourceId, targetId: x.name });
  }
}
