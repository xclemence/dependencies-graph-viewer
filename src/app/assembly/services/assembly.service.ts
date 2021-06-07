import { Injectable } from '@angular/core';
import { ApolloClient, ApolloQueryResult, gql, NormalizedCacheObject } from '@apollo/client/core';
import { AssemblyConverter } from '@app/core/converters';
import { Assembly, AssemblyStat } from '@app/core/models/assembly';
import { handleApolloError } from '@app/shared/apollo-error';
import { SortDirection } from '@app/shared/models';
import { Apollo } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const getAssembliesQuery = gql`
  query assemblies($options: AssemblyOptions) {
    assemblies(options: $options) {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    },
    assemblyCount
  }
`;

export const getAssembliesWithFilterQuery = gql`
  query assemblies($options: [AssemblyOptions], $filter: String!) {
    assemblies(options: $options, where: {shortName_CONTAINS : $filter}) {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    },
    assemblyCount(where: {shortName_CONTAINS: $filter})
  }
`;

export const getAssemblyDepthQuery = gql`
  query assemblyDepth($assemblyId: String!, $depth: Int!) {
    assemblies(where: { name: $assemblyId }){
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
    assemblies(where: { name: $assemblyId }){
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

  constructor(private readonly apollo: Apollo) {}

  assemblyStatistics(pageSize: number, page: number, namefilter: string, order: {[key:string]: SortDirection})
    : Observable<{ assemblies: AssemblyStat[], count: number }> {

    const query = !namefilter ? this.assemblyStatisticsNoFilter(pageSize, page, order) :
      this.assemblyStatisticsWithFilter(pageSize, page, namefilter, order);

    return query.pipe(
      map(handleApolloError),
      map((x: any) => ({
        assemblies: x.data.assemblies.map((a: any) => AssemblyConverter.toAssemblyStat(a)),
        count: x.data.assemblyCount
      }))
    );
  }

  private assemblyStatisticsWithFilter(pageSize: number, page: number, namefilter: string, orders: {[key:string]: SortDirection})
    : Observable<ApolloQueryResult<unknown>> {

    return this.apollo.query({
      query: getAssembliesWithFilterQuery,
      variables: {
        filter: namefilter,
        options: {
          limit: pageSize,
          skip: pageSize * page,
          sort: orders
        }
      }
    });
  }

  private assemblyStatisticsNoFilter(pageSize: number, page: number, orders: {[key:string]: SortDirection}): Observable<ApolloQueryResult<unknown>> {

    return this.apollo.query({
      query: getAssembliesQuery,
      variables: {
        options: {
          limit: pageSize,
          skip: pageSize * page,
          sort: orders
        }
      }
    });
  }

  references(id: string, depth: number): Observable<Assembly> {
    return this.apollo.query({
      query: getAssemblyDepthQuery,
      variables: {
        assemblyId: id,
        depth
      }
    }).pipe(
      map(handleApolloError),
      map((x: any) => x.data.assemblies[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }

  assemblyDepthMax(id: string): Observable<{id: string, value: number}> {
    return this.apollo.query({
      query: getAssemblyDepthMaxQuery,
      variables: {
        assemblyId: id
      }
    }).pipe(
      map(handleApolloError),
      map((x: any) => ({id, value: x.data.assemblies[0].maxDepth }))
    );
  }

  remove(id: string): Observable<string> {
    return this.apollo.mutate({
      mutation: removeAssemblyQuery,
      variables: {
        assemblyName: id
      }
    }).pipe(
      map(handleApolloError),
      map((x: any) => x.data.removeAssembly.name)
    );
  }
}
