import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { flatMap, map, toArray } from 'rxjs/operators';

import { Assembly, AssemblyStat } from '../../models/assembly';
import { AssemblyConverter } from './assembly-converter';

const getAssemblies = gql`
  query assemblies {
    Assembly {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    }
  }
`;

const getAssemblyDepth = gql`
  query softwareAssemblies($assemblyId: String!, $depth: Int!) {
    Assembly(filter: { name: $assemblyId }){
      name,
      shortName,
      isNative,
      version,
      allReferencedAssemblies(depth: $depth) {
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
export class AssemblyService {

  saveAssemvly = new Map<string, Assembly>();

  constructor(private appoloService: Apollo) { }

  assemblyStatistics(take: number, page: number): Observable<AssemblyStat[]> {
    return this.appoloService.query({ query: getAssemblies }).pipe(
      flatMap((x: any) => x.data.Assembly),
      map((x: any) => AssemblyConverter.toAssemblyStat(x)),
      toArray()
    );
  }

  references(id: string, depth: number): Observable<Assembly> {
    return this.appoloService.query({
        query: getAssemblyDepth,
        variables: {
          assemblyId: id,
          depth: depth
       } }).pipe(
      map((x: any) => x.data.Assembly[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }
}
