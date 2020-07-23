import { async, TestBed } from '@angular/core/testing';
import { operationCanceled } from '@app/core/store/actions';
import { operationFailure } from '@app/core/store/actions/error.actions';
import { Actions } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { SoftwareService } from '../../services/software.service';
import { loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareAssembliesEffects } from './software-assemblies.effects';


describe('SoftwareAssembliesEffects', () => {

  const assemblyTest = {
    id: '1',
    name: 'test',
    version: '1.0',
    isNative: false,
    isSoftware: true,
  };

  const initialState = {
    software: {
      assemblies: {
        software: {
          ...assemblyTest,
          id: '123',
          links: [],
          referencedAssemblies: []
        },
        filteredAssemblies: []
      }
    }
  };

  let testScheduler: TestScheduler;
  let serviceSpy: jasmine.SpyObj<SoftwareService>;

  beforeEach(async(() => {
    serviceSpy = jasmine.createSpyObj<SoftwareService>('service', ['software']);

    TestBed.configureTestingModule({
      providers: [
        SoftwareAssembliesEffects,
        { provide: SoftwareService, useValue: serviceSpy },
        provideMockStore({ initialState })
      ]
    });
  }));

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load software assemblies', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: '[Software Assemblies] Load Software Assemblies',
        assemblyName: { ...assemblyTest }
      };

      const resultAssembly = {
        ...assemblyTest,
        links: [],
        referencedAssemblies: []
      };

      const actionProvider = hot('-a', { a: originAction });

      serviceSpy.software.and.returnValue(of(resultAssembly));

      TestBed.configureTestingModule({
        providers: [
          { provide: Actions, useValue: new Actions(actionProvider) },
        ]
      });

      const effects = TestBed.inject(SoftwareAssembliesEffects);

      expectObservable(effects.loadSoftwareAssemblies).toBe('-a', {
        a: loadSoftwareAssembliesSuccess({ data: resultAssembly, origin: originAction })
      });
    });
  });

  it('should not load software assemblies', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: 'Test'
      };

      const actionProvider = hot('-a', { a: originAction });

      TestBed.configureTestingModule({
        providers: [
          { provide: Actions, useValue: new Actions(actionProvider) },
        ]
      });

      const effects = TestBed.inject(SoftwareAssembliesEffects);

      expectObservable(effects.loadSoftwareAssemblies).toBe('--');
    });
  });

  it('should handle error', () => {

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const originAction = {
        type: '[Software Assemblies] Load Software Assemblies',
        assemblyName: { ...assemblyTest }
      };

      const actionProvider = hot('-a', { a: originAction });

      TestBed.configureTestingModule({
        providers: [
          { provide: Actions, useValue: new Actions(actionProvider) },
        ]
      });

      serviceSpy.software.and.returnValue(cold('#', null, new Error('new error')));

      const effects = TestBed.inject(SoftwareAssembliesEffects);

      expectObservable(effects.loadSoftwareAssemblies).toBe('-a', {
        a: operationFailure({ error: 'new error', origin: originAction })
      });
    });
  });

  it('should cancel operation', () => {

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const originAction = {
        type: '[Software Assemblies] Load Software Assemblies',
        assemblyName: { ...assemblyTest, id: '123' }
      };

      const actionProvider = hot('-a', { a: originAction });

      TestBed.configureTestingModule({
        providers: [
          { provide: Actions, useValue: new Actions(actionProvider) },
        ]
      });

      serviceSpy.software.and.returnValue(cold('#', null, new Error('new error')));

      const effects = TestBed.inject(SoftwareAssembliesEffects);

      expectObservable(effects.loadSoftwareAssemblies).toBe('-a', {
        a: operationCanceled({ origin: originAction })
      });
    });
  });
});
