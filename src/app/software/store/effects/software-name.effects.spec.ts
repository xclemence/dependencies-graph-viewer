import { operationFailure } from '@app/core/store/actions/error.actions';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { loadSoftwareNamesSuccess } from '../actions';
import { SoftwareService } from './../../services/software.service';
import { SoftwareNameEffects } from './software-name.effects';


describe('SoftwareNameEffects', () => {

  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load software names', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: '[Software] Load Softwares',
      };

      const resultAssemblies = [
        {
          id: '1',
          name: 'test',
          version: '1.0',
          isNative: false,
          isSoftware: true,
        }
      ];

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<SoftwareService>('service', ['names']);

      serviceSpy.names.and.returnValue(of(resultAssemblies));

      const actions = new Actions(actionProvider);
      const effects = new SoftwareNameEffects(actions, serviceSpy);

      expectObservable(effects.loadSoftwareNames).toBe('-a', {
        a: loadSoftwareNamesSuccess({ data: resultAssemblies, origin: originAction })
      });
    });
  });

  it('should not load software name', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const originAction = {
        type: 'Test'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<SoftwareService>('service', ['names']);

      const actions = new Actions(actionProvider);
      const effects = new SoftwareNameEffects(actions, serviceSpy);

      expectObservable(effects.loadSoftwareNames).toBe('--');
    });
  });

  it('should handle error', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const originAction = {
        type: '[Software] Load Softwares'
      };

      const actionProvider = hot('-a', { a: originAction });

      const serviceSpy = jasmine.createSpyObj<SoftwareService>('service', ['names']);

      serviceSpy.names.and.returnValue(cold('#', undefined, new Error('new error')));

      const actions = new Actions(actionProvider);
      const effects = new SoftwareNameEffects(actions, serviceSpy);

      expectObservable(effects.loadSoftwareNames).toBe('-a', {
        a: operationFailure({ error: 'new error', origin: originAction })
      });
    });
  });
});
