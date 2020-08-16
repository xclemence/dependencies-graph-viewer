import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AssemblyConverter } from '@app/core/converters';
import { AssemblyBase } from '@app/core/models';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { getSoftwareAssemblies, getSoftwareNames, SoftwareService } from './software.service';

describe('SoftwareService', () => {

  let service: SoftwareService;

  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(SoftwareService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should load software names', fakeAsync(() => {

    const expectedNames = [
      { name: 'test 1', version: '1', shortName: 'test' }
    ];

    const expectedResult = expectedNames.map(x => AssemblyConverter.toAssemblyBase<AssemblyBase>(x));

    service.names().subscribe({
      next: x => expect(x).toEqual(expectedResult)
    });

    const mockOperation = controller.expectOne(getSoftwareNames);

    mockOperation.flush({
      data: {
        Software: expectedNames
      }
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

    service.software('test1').subscribe({
      next: x => expect(x).toEqual(AssemblyConverter.toAssembly(software))
    });

    const mockOperation = controller.expectOne(getSoftwareAssemblies);

    mockOperation.flush({
      data: {
        Assembly: [
          software
        ]
      }
    });

    tick();

    expect(mockOperation.operation.variables.assemblyId).toEqual('test1');
  }));

});
