import { Injectable } from '@angular/core';
import { AssemblyConverter } from '@app/core/converters';
import { Assembly, AssemblyStat } from '@app/core/models/assembly';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const getAssembliesQuery = gql`
  query assemblies($first: Int!, $offset: Int!, $order: [_AssemblyOrdering]) {
    Assembly(first: $first, offset: $offset, orderBy: $order) {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    },
    AssemblyCount
  }
`;

const getAssembliesWithFilterQuery = gql`
  query assemblies($filter: String!) {
    Assembly(filter: {shortName_contains : $filter}) {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    },
    AssemblyCount(filter: {shortName_contains : $filter})
  }
`;

const getAssemblyDepthQuery = gql`
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
      allReferencedAssembliesLinks {source, target}
    }
  }
`;

const removeAssemblyQuery = gql`
  mutation RemoveAssembly($assemblyName: String!) {
    removeAssembly(assemblyName: $assemblyName) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {


  constructor(private apolloService: Apollo) { }

  assemblyStatistics(pageSize: number, page: number, namefilte: string, order: string)
    : Observable<{ assemblies: AssemblyStat[], count: number}> {

    return this.apolloService.query({
        query: getAssembliesQuery,
        variables: {
          first: pageSize,
          offset: pageSize * page,
          order
        }
      }).pipe(
      map((x: any) => ({
        assemblies: x.data.Assembly.map((a: any) => AssemblyConverter.toAssemblyStat(a)),
        count: x.data.AssemblyCount
      }))
    );
  }

  references(id: string, depth: number): Observable<Assembly> {
    return this.apolloService.query({
      query: getAssemblyDepthQuery,
      variables: {
        assemblyId: id,
        depth
      }
    }).pipe(
      map((x: any) => x.data.Assembly[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }

  remove(id: string): Observable<string> {
    return this.apolloService.mutate({
      mutation: removeAssemblyQuery,
      variables: {
        assemblyName: id
      }
    }).pipe(
      map((x: any) => x.name)
    );
  }
}
