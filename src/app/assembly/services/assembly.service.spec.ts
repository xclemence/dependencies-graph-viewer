import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AssemblyConverter } from '@app/core/converters';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import {
  AssemblyService,
  getAssembliesQuery,
  getAssembliesWithFilterQuery,
  getAssemblyDepthQuery,
  removeAssemblyQuery,
} from './assembly.service';

describe('AssemblyService', () => {

  let service: AssemblyService;

  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(AssemblyService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
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

    service.references('1', 10).subscribe({
      next: x => {
        expect(x).toEqual(AssemblyConverter.toAssembly(expectedAssembly));
      }
    });

    const mockOperation = controller.expectOne(getAssemblyDepthQuery);

    mockOperation.flush({
      data: {
        Assembly: [
          expectedAssembly
        ]
      }
    });

    expect(mockOperation.operation.variables.assemblyId).toEqual('1');
    expect(mockOperation.operation.variables.depth).toEqual(10);

    tick();

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

    service.assemblyStatistics(10, 2, 'test', 'order').subscribe({
      next: ({assemblies, count }) => {
        expect(assemblies).toEqual(expectedResultAssemblies);
        expect(count).toBe(2);
      }
    });

    const mockOperation = controller.expectOne(getAssembliesWithFilterQuery);

    mockOperation.flush({
      data: {
        Assembly: expectedAssemblies,
        AssemblyCount: 2
      }
    });

    expect(mockOperation.operation.variables.first).toEqual(10);
    expect(mockOperation.operation.variables.offset).toEqual(20);
    expect(mockOperation.operation.variables.order).toEqual('order');
    expect(mockOperation.operation.variables.filter).toEqual('test');

    tick();
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

    service.assemblyStatistics(10, 2, undefined, 'order').subscribe({
      next: ({assemblies, count }) => {
        expect(assemblies).toEqual(expectedResultAssemblies);
        expect(count).toBe(2);
      }
    });

    const mockOperation = controller.expectOne(getAssembliesQuery);

    mockOperation.flush({
      data: {
        Assembly: expectedAssemblies,
        AssemblyCount: 2
      }
    });

    expect(mockOperation.operation.variables.first).toEqual(10);
    expect(mockOperation.operation.variables.offset).toEqual(20);
    expect(mockOperation.operation.variables.order).toEqual('order');

    tick();
  }));

  it('should call delete mutation', fakeAsync(() => {

    service.remove('1').subscribe({
      next: (x => expect(x).toEqual('test1'))
    });

    const mockOperation = controller.expectOne(removeAssemblyQuery);

    mockOperation.flush({
      data: { removeAssembly: {name: 'test1'} }
    });

    expect(mockOperation.operation.variables.assemblyName).toEqual('1');

    tick();
  }));

});
