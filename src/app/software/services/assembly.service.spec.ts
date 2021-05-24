import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { AssemblyConverter } from '@app/core/converters';
import { AssemblyBase } from '@app/core/models';

import { getSoftwareAssemblies, SoftwareService } from './software.service';

describe('SoftwareService', () => {

  let service: SoftwareService;

  let apolloClientSpy: jasmine.SpyObj<ApolloClient<NormalizedCacheObject>>;

  beforeEach(() => {
    apolloClientSpy = jasmine.createSpyObj<ApolloClient<NormalizedCacheObject>>('apollo', ['query', 'mutate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ApolloClient, useValue: apolloClientSpy },
      ]
    });
    service = TestBed.inject(SoftwareService);
  });

  it('should load software names', fakeAsync(() => {

    const expectedNames = [
      { name: 'test 1', version: '1', shortName: 'test' }
    ];

    const expectedResult = expectedNames.map(x => AssemblyConverter.toAssemblyBase<AssemblyBase>(x));

    apolloClientSpy.query.and.returnValue(Promise.resolve({
      data: {
        Software: expectedNames
      },
      loading: false,
      networkStatus: 3
    }));

    service.names().subscribe({
      next: x => expect(x).toEqual(expectedResult)
    });

    tick();
  }));

  it('should load software', fakeAsync(() => {

    const software = {
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
          software
        ]
      },
      loading: false,
      networkStatus: 3
    }));

    service.software('test1').subscribe({
      next: x => expect(x).toEqual(AssemblyConverter.toAssembly(software))
    });

    tick();

    expect(apolloClientSpy.query).toHaveBeenCalledWith({
      query: getSoftwareAssemblies,
      variables: {
        assemblyId: 'test1',
      }
    });

  }));

});
