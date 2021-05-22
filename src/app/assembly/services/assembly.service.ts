import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { ApolloQueryResult, NormalizedCacheObject } from '@apollo/client/core';
import { AssemblyConverter } from '@app/core/converters';
import { Assembly, AssemblyStat } from '@app/core/models/assembly';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloClient } from '@apollo/client/core';

export const getAssembliesQuery = gql`
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

export const getAssembliesWithFilterQuery = gql`
  query assemblies($first: Int!, $offset: Int!, $order: [_AssemblyOrdering], $filter: String!) {
    Assembly(first: $first, offset: $offset, orderBy: $order, filter: {shortName_contains : $filter}) {
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

export const getAssemblyDepthQuery = gql`
  query assemblyDepth($assemblyId: String!, $depth: Int!) {
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

export const getAssemblyDepthMaxQuery = gql`
  query assemblyDepthMax($assemblyId: String!) {
    Assembly(filter: { name: $assemblyId }){
      name,
      maxDepth,
    }
  }
`;

export const removeAssemblyQuery = gql`
  mutation removeAssembly($assemblyName: String!) {
    removeAssembly(assemblyName: $assemblyName) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {

  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) { }

  assemblyStatistics(pageSize: number, page: number, namefilter: string, order: string)
    : Observable<{ assemblies: AssemblyStat[], count: number }> {

    const query = !namefilter ? this.assemblyStatisticsNoFilter(pageSize, page, order) :
      this.assemblyStatisticsWithFilter(pageSize, page, namefilter, order);

    return query.pipe(
      map((x: any) => ({
        assemblies: x.data.Assembly.map((a: any) => AssemblyConverter.toAssemblyStat(a)),
        count: x.data.AssemblyCount
      }))
    );
  }

  private assemblyStatisticsWithFilter(pageSize: number, page: number, namefilter: string, order: string)
    : Observable<ApolloQueryResult<unknown>> {

    return from(this.apolloClient.query({
      query: getAssembliesWithFilterQuery,
      variables: {
        first: pageSize,
        offset: pageSize * page,
        order,
        filter: namefilter
      }
    }));
  }

  private assemblyStatisticsNoFilter(pageSize: number, page: number, order: string): Observable<ApolloQueryResult<unknown>> {

    return from(this.apolloClient.query({
      query: getAssembliesQuery,
      variables: {
        first: pageSize,
        offset: pageSize * page,
        order
      }
    }));
  }

  references(id: string, depth: number): Observable<Assembly> {
    return from(this.apolloClient.query({
      query: getAssemblyDepthQuery,
      variables: {
        assemblyId: id,
        depth
      }
    })).pipe(
      map((x: any) => x.data.Assembly[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }

  assemblyDepthMax(id: string): Observable<{id: string, value: number}> {
    return from(this.apolloClient.query({
      query: getAssemblyDepthMaxQuery,
      variables: {
        assemblyId: id
      }
    })).pipe(
      map((x: any) => ({id, value: x.data.Assembly[0].maxDepth }))
    );
  }

  remove(id: string): Observable<string> {
    return from(this.apolloClient.mutate({
      mutation: removeAssemblyQuery,
      variables: {
        assemblyName: id
      }
    })).pipe(
      map((x: any) => x.data.removeAssembly.name)
    );
  }
}
