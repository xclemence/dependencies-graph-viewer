import { AssemblyService } from '@app/assembly/services/assembly.service';
import { empty } from '@app/core/store/actions/empty.actions';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { loadAssemblyDepthMaxSuccess } from '../actions/assembly-depth-max.actions';
import { AssemblyDepthMaxEffects } from './assembly-depth-max.effects';


describe('AssemblyDepthMaxEffects', () => {

  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load assembly depth max', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: '[Assembly Depth Max] Load Assembly Depth Max',
        assemblyId: '1',
      };

      const resultAssembly = {
        id: '1',
        name: 'name1',
        version: '1.0',
        isNative: false,
        isSoftware: false,
        links: [ ],
        referencedAssemblies: [ ]
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', [ 'assemblyDepthMax']);

      serviceSpy.assemblyDepthMax.and.returnValue(of({id: '1', value: 123}));

      const actions = new Actions(actionProvider);
      const effects = new AssemblyDepthMaxEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblyDepthMax).toBe('-a', {
        a: loadAssemblyDepthMaxSuccess({ assemblyId: '1', depthMax: 123,  origin: originAction })
      });
    });
  });

  it('should not load assembly depth max', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: 'Hello',
        assemblyId: '1',
        depth: '2'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', [ 'assemblyDepthMax']);

      const actions = new Actions(actionProvider);
      const effects = new AssemblyDepthMaxEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblyDepthMax).toBe('--');
    });
  });

  it('should handle error', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const originAction = {
        type: '[Assembly Depth Max] Load Assembly Depth Max',
        assemblyId: '1',
        depth: '2'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', [ 'assemblyDepthMax']);

      serviceSpy.assemblyDepthMax.and.returnValue(cold('#', undefined, new Error('new error')));

      const actions = new Actions(actionProvider);
      const effects = new AssemblyDepthMaxEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblyDepthMax).toBe('-a', {
        a: empty({ origin: originAction })
      });
    });
  });
});
