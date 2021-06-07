import { Injectable } from '@angular/core';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core';
import { AssemblyConverter } from '@app/core/converters';
import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { operationFailure } from '@app/core/store/actions';
import { handleApolloError } from '@app/shared/apollo-error';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

export const getSoftwareNames = gql`
  query softwareNames {
    software {
        name,
        version,
        shortName
    }
  }
`;

export const getSoftwareAssemblies = gql`
  query softwareAssemblies($assemblyId: String!) {
    assemblies(where: { name: $assemblyId }){
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
      allReferencedAssembliesLinks {source, target}
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private readonly apollo: Apollo) { }

  names(): Observable<AssemblyBase[]> {
    return this.apollo.query({ query: getSoftwareNames }).pipe(
      map(handleApolloError),
      mergeMap((x: any) => x.data.software),
      map((x: any) => AssemblyConverter.toAssemblyBase<AssemblyBase>(x)),
      toArray()
    );
  }

  software(assemblyId: string): Observable<Assembly> {
    return this.apollo.query({ query: getSoftwareAssemblies, variables: { assemblyId } }).pipe(
      map(handleApolloError),
      map((x: any) => x.data.assemblies[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }
}
