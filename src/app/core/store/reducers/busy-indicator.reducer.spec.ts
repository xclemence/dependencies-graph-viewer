import { addBusyIndicatorAction, removeBusyIndicatorAction } from '../actions';
import { BusyState } from '../models';
import { busyIndicatorReducer } from './busy-indicator.reducer';

describe('busyIndicatorReducer', () => {

  it('should have initial state', () => {
    const expected = { actionsInProgress: [] };
    const action = { type: 'foo' } as any;

    expect(busyIndicatorReducer(undefined, action)).toEqual(expected);
  });

  it('should add new busy key', () => {
    const state: BusyState = {
      actionsInProgress: [
        'busy1',
        'busy2'
      ]
    };

    const busyKey = 'New Busy';
    const expected = {
      actionsInProgress: [
        'busy1',
        'busy2',
        busyKey
      ]
    };

    const action = addBusyIndicatorAction({ key: busyKey });

    expect(busyIndicatorReducer(state, action)).toEqual(expected);
  });

  it('should not duplicate exesiting key', () => {
    const state: BusyState = {
      actionsInProgress: [
        'busy1',
        'busy2'
      ]
    };

    const busyKey = 'busy1';

    const action = addBusyIndicatorAction({ key: busyKey });

    expect(busyIndicatorReducer(state, action)).toEqual(state);
  });


  it('should remove busy key', () => {
    const state: BusyState = {
      actionsInProgress: [
        'busy1',
        'busy2',
        'busy3'
      ]
    };

    const expected = {
      actionsInProgress: [
        'busy1',
        'busy3',
      ]
    };

    const action = removeBusyIndicatorAction({ key: 'busy2' });

    expect(busyIndicatorReducer(state, action)).toEqual(expected);
  });

  it('try remove unknown busy key', () => {
    const state: BusyState = {
      actionsInProgress: [
        'busy1',
        'busy2'
      ]
    };

    const action = removeBusyIndicatorAction({ key: 'test' });

    expect(busyIndicatorReducer(state, action)).toEqual(state);
  });
});
