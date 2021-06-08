import { AssemblyService } from '@app/assembly/services/assembly.service';
import { empty } from '@app/core/store/actions/empty.actions';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { loadAssembliesSuccess } from '../actions';
import { AssembliesEffects } from './assemblies.effects';


describe('AssembliesEffects', () => {

  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load assembly', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: '[Assemblies] Load Assemblies',
        take: 2,
        page: 3,
        filter: '',
        order: ''
      };

      const resultAssembly = {
        assemblies: [
          {
            id: '1',
            name: 'test',
            version: '1.0',
            isNative: false,
            isSoftware: true,
            depthMax: 3,
            assemblyLinkCount: 10
          }
        ],
        count: 2
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', ['assemblyStatistics']);

      serviceSpy.assemblyStatistics.and.returnValue(of(resultAssembly));

      const actions = new Actions(actionProvider);
      const effects = new AssembliesEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblies).toBe('-a', {
        a: loadAssembliesSuccess({ data: resultAssembly.assemblies, assembliesCount: resultAssembly.count, origin: originAction })
      });
    });
  });

  it('should not load assembly', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: 'Test'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', ['assemblyStatistics']);

      const actions = new Actions(actionProvider);
      const effects = new AssembliesEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblies).toBe('--');
    });
  });

  it('should handle error', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const originAction = {
        type: '[Assemblies] Load Assemblies',
        assemblyId: '1',
        depth: '2'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', ['assemblyStatistics']);

      serviceSpy.assemblyStatistics.and.returnValue(cold('#', undefined, new Error('new error')));

      const actions = new Actions(actionProvider);
      const effects = new AssembliesEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblies).toBe('-a', {
        a: empty({ origin: originAction })
      });
    });
  });
});
