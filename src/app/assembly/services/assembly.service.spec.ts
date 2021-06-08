import { fakeAsync, TestBed } from '@angular/core/testing';
import { AssemblyConverter } from '@app/core/converters';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

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
  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    apolloSpy = jasmine.createSpyObj<Apollo>('apollo', ['query', 'mutate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Apollo, useValue: apolloSpy },
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
    apolloSpy.query.and.returnValue(of({
      data: {
        assemblies: [
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

    expect(apolloSpy.query).toHaveBeenCalledWith({
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

    apolloSpy.query.and.returnValue(of({
      data: {
        assemblies: expectedAssemblies,
        assemblyCount: 2
      },
      loading: false,
      networkStatus: 3
    }));

    service.assemblyStatistics(10, 2, 'test',  { field: 'ASC'}).subscribe({
      next: ({ assemblies, count }) => {
        expect(assemblies).toEqual(expectedResultAssemblies);
        expect(count).toBe(2);
      }
    });

    expect(apolloSpy.query).toHaveBeenCalledWith({
      query: getAssembliesWithFilterQuery,
      variables: {
        options: {
          limit: 10,
          skip: 20,
          sort: { field: 'ASC'}
        },
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

    apolloSpy.query.and.returnValue(of({
      data: {
        assemblies: expectedAssemblies,
        assemblyCount: 2
      },
      loading: false,
      networkStatus: 3
    }));

    service.assemblyStatistics(10, 2, '', { field: 'ASC'}).subscribe({
      next: ({ assemblies, count }) => {
        expect(assemblies).toEqual(expectedResultAssemblies);
        expect(count).toBe(2);
      }
    });

    expect(apolloSpy.query).toHaveBeenCalledWith({
      query: getAssembliesQuery,
      variables: {
        options: {
          limit: 10,
          skip: 20,
          sort: { field: 'ASC'},
        }
      }
    });

  }));

  it('should call delete mutation', fakeAsync(() => {


    apolloSpy.mutate.and.returnValue(of({
      data: { removeAssembly: { name: 'test1' } },
      loading: false,
      networkStatus: 3
    }));

    service.remove('1').subscribe({
      next: (x => expect(x).toEqual('test1'))
    });

    expect(apolloSpy.mutate).toHaveBeenCalledWith({
      mutation: removeAssemblyQuery,
      variables: {
        assemblyName: '1',
      }
    });

  }));

  it('should load assembly depth max', fakeAsync(() => {

    apolloSpy.query.and.returnValue(of({
      data: {
        assemblies: [
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

    expect(apolloSpy.query).toHaveBeenCalledWith({
      query: getAssemblyDepthMaxQuery,
      variables: {
        assemblyId: 'test',
      }
    });
  }));

});
