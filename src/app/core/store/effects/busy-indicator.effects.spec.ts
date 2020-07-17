import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';

import { addBusyIndicatorAction, removeBusyIndicatorAction } from '../actions';
import { BusyIndicatorEffects } from './busy-indicator.effects';

describe('BusyIndicatorEffects', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should generate add busy action with good key', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: { type: 'Test Action', busyKey: 'testKey' }
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.addBusyEffect).toBe('-a', {
        a: addBusyIndicatorAction({ key: 'testKey' })
      });

    });
  });

  it('should not generate add busy action due to no busy key', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: { type: 'Test Action' }
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.addBusyEffect).toBe('--');
    });
  });

  it('should not generate add busy action due to undefined action ', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: undefined
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.addBusyEffect).toBe('--');
    });

  });

  it('should generate remove busy action with good key', () => {

    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: {
          type: 'Test Action',
          origin: {
            busyKey: 'testKey'
          }
        }
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.removeBusyEffect).toBe('-a', {
        a: removeBusyIndicatorAction({ key: 'testKey' })
      });

    });
  });

  it('should not generate remove busy action due to undefined action ', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: undefined
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.removeBusyEffect).toBe('--');
    });

  });

  it('should not generate remove busy action due to no origin action ', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: { type: 'Test Action' }
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.removeBusyEffect).toBe('--');
    });

  });

  it('should not generate remove busy action due to no busy key ', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const actionProvider = hot('-a', {
        a: {
          type: 'Test Action',
          origin: { type: 'Origin Action' }
        }
      });

      const actions = new Actions(actionProvider);
      const effects = new BusyIndicatorEffects(actions);

      expectObservable(effects.removeBusyEffect).toBe('--');
    });

  });
});
