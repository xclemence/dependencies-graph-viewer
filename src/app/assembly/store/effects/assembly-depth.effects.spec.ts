import { AssemblyService } from '@app/assembly/services/assembly.service';
import { empty } from '@app/core/store/actions/empty.actions';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { loadAssemblyDepthSuccess } from '../actions';
import { AssemblyDepthEffects } from './assembly-depth.effects';


describe('AssemblyDepthEffects', () => {

  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load assembly', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: '[Assembly Depth] Load Assembly Depth',
        assemblyId: '1',
        depth: '2'
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

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', [ 'references']);

      serviceSpy.references.and.returnValue(of(resultAssembly));

      const actions = new Actions(actionProvider);
      const effects = new AssemblyDepthEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblyDepth).toBe('-a', {
        a: loadAssemblyDepthSuccess({ data: resultAssembly,  origin: originAction })
      });
    });
  });

  it('should not load assembly', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: 'Hello',
        assemblyId: '1',
        depth: '2'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', [ 'references']);

      const actions = new Actions(actionProvider);
      const effects = new AssemblyDepthEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblyDepth).toBe('--');
    });
  });

  it('should handle error', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const originAction = {
        type: '[Assembly Depth] Load Assembly Depth',
        assemblyId: '1',
        depth: '2'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<AssemblyService>('service', [ 'references']);

      serviceSpy.references.and.returnValue(cold('#', undefined, new Error('new error')));

      const actions = new Actions(actionProvider);
      const effects = new AssemblyDepthEffects(actions, serviceSpy);

      expectObservable(effects.loadAssemblyDepth).toBe('-a', {
        a: empty({ origin: originAction })
      });
    });
  });
});
