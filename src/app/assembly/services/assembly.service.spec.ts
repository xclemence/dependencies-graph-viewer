import { fakeAsync, TestBed } from '@angular/core/testing';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { AssemblyConverter } from '@app/core/converters';

import {
  AssemblyService,
  getAssembliesQuery,
  getAssembliesWithFilterQuery,
  getAssemblyDepthMaxQuery,
  getAssemblyDepthQuery,
  removeAssemblyQuery,
} from './assembly.service';

describe('AssemblyService', () => {

  let service: AssemblyService;
  let apolloClientSpy: jasmine.SpyObj<ApolloClient<NormalizedCacheObject>>;

  beforeEach(() => {
    apolloClientSpy = jasmine.createSpyObj<ApolloClient<NormalizedCacheObject>>('apollo', ['query', 'mutate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApolloClient, useValue: apolloClientSpy },
      ]
    });
    service = TestBed.inject(AssemblyService);
  });

  it('should load assembly and references', fakeAsync(() => {

    const expectedAssembly = {
      name: 'test1',
      shortName: 'test1',
      isNative: false,
      version: '2.0.0.0',
      allReferencedAssemblies: [
        { name: 'test2', shortName: 'test2 (short)', isNative: false, version: '1.0.0.0' }
      ],
      allReferencedAssembliesLinks: [
        { source: 'test1', target: 'test2' }
      ]
    };
    apolloClientSpy.query.and.returnValue(Promise.resolve({
      data: {
        Assembly: [
          expectedAssembly
        ]
      },
      loading: false,
      networkStatus: 3
    }));

    service.references('1', 10).subscribe({
      next: x => {
        expect(x).toEqual(AssemblyConverter.toAssembly(expectedAssembly));
      }
    });

    expect(apolloClientSpy.query).toHaveBeenCalledWith({
      query: getAssemblyDepthQuery,
      variables: {
        assemblyId: '1',
        depth: 10
      }
    });

  }));

  it('should load assembly statistic with filter', fakeAsync(() => {

    const expectedAssemblies = [
      {
        name: 'Dependencies Viewer, Version=2.0.0.0',
        version: '2.0.0.0',
        shortName: 'Dependencies Viewer',
        isNative: false,
        maxDepth: 4,
        directReferenceCount: 8,
      },
      {
        name: 'Dependencies.Analyser.Native, Version=2.0.0.0',
        version: '2.0.0.0',
        shortName: 'Dependencies.Analyser.Native',
        isNative: false,
        maxDepth: 3,
        directReferenceCount: 2,
      },
    ];

    const expectedResultAssemblies = expectedAssemblies.map(x => AssemblyConverter.toAssemblyStat(x));

    apolloClientSpy.query.and.returnValue(Promise.resolve({
      data: {
        Assembly: expectedAssemblies,
        AssemblyCount: 2
      },
      loading: false,
      networkStatus: 3
    }));

    service.assemblyStatistics(10, 2, 'test', 'order').subscribe({
      next: ({ assemblies, count }) => {
        expect(assemblies).toEqual(expectedResultAssemblies);
        expect(count).toBe(2);
      }
    });

    expect(apolloClientSpy.query).toHaveBeenCalledWith({
      query: getAssembliesWithFilterQuery,
      variables: {
        first: 10,
        offset: 20,
        order: 'order',
        filter: 'test'
      }
    });

  }));

  it('should load assembly statistic with no filter', fakeAsync(() => {

    const expectedAssemblies = [
      {
        name: 'Dependencies Viewer, Version=2.0.0.0',
        version: '2.0.0.0',
        shortName: 'Dependencies Viewer',
        isNative: false,
        maxDepth: 4,
        directReferenceCount: 8,
      },
      {
        name: 'Dependencies.Analyser.Native, Version=2.0.0.0',
        version: '2.0.0.0',
        shortName: 'Dependencies.Analyser.Native',
        isNative: false,
        maxDepth: 3,
        directReferenceCount: 2,
      },
    ];

    const expectedResultAssemblies = expectedAssemblies.map(x => AssemblyConverter.toAssemblyStat(x));

    apolloClientSpy.query.and.returnValue(Promise.resolve({
      data: {
        Assembly: expectedAssemblies,
        AssemblyCount: 2
      },
      loading: false,
      networkStatus: 3
    }))

    service.assemblyStatistics(10, 2, '', 'order').subscribe({
      next: ({ assemblies, count }) => {
        expect(assemblies).toEqual(expectedResultAssemblies);
        expect(count).toBe(2);
      }
    });

    expect(apolloClientSpy.query).toHaveBeenCalledWith({
      query: getAssembliesQuery,
      variables: {
        first: 10,
        offset: 20,
        order: 'order',
      }
    });

  }));

  it('should call delete mutation', fakeAsync(() => {


    apolloClientSpy.mutate.and.returnValue(Promise.resolve({
      data: { removeAssembly: { name: 'test1' } },
      loading: false,
      networkStatus: 3
    }));

    service.remove('1').subscribe({
      next: (x => expect(x).toEqual('test1'))
    });

    expect(apolloClientSpy.mutate).toHaveBeenCalledWith({
      mutation: removeAssemblyQuery,
      variables: {
        assemblyName: '1',
      }
    });

  }));

  it('should load assembly depth max', fakeAsync(() => {

    apolloClientSpy.query.and.returnValue(Promise.resolve({
      data: {
        Assembly: [
          { name: 'test', maxDepth: 3 }
        ]
      },
      loading: false,
      networkStatus: 3
    }));

    service.assemblyDepthMax('test').subscribe({
      next: (x) => {
        expect(x).toEqual({ id: 'test', value: 3 });
      }
    });

    expect(apolloClientSpy.query).toHaveBeenCalledWith({
      query: getAssemblyDepthMaxQuery,
      variables: {
        assemblyId: 'test',
      }
    });
  }));

});
