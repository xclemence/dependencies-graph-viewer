import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AssemblyConverter } from '@app/core/converters';
import { AssemblyBase } from '@app/core/models';

import { getSoftwareAssemblies, SoftwareService } from './software.service';

import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

describe('SoftwareService', () => {

  let service: SoftwareService;

  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    apolloSpy = jasmine.createSpyObj<Apollo>('apollo', ['query', 'mutate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Apollo, useValue: apolloSpy },
      ]
    });
    service = TestBed.inject(SoftwareService);
  });

  it('should load software names', fakeAsync(() => {

    const expectedNames = [
      { name: 'test 1', version: '1', shortName: 'test' }
    ];

    const expectedResult = expectedNames.map(x => AssemblyConverter.toAssemblyBase<AssemblyBase>(x));

    apolloSpy.query.and.returnValue(of({
      data: {
        software: expectedNames
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

    apolloSpy.query.and.returnValue(of({
      data: {
        assemblies: [
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

    expect(apolloSpy.query).toHaveBeenCalledWith({
      query: getSoftwareAssemblies,
      variables: {
        assemblyId: 'test1',
      }
    });

  }));

});
