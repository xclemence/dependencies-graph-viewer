import { loadSoftwareNames, loadSoftwareNamesSuccess } from '../actions';
import { softwareNameReducer } from './software-name.reducer';

describe('softwareNameReducer', () => {

  const initialState = {
    softwareNames: [],
  };

  it('should have initial state', () => {
    const action = { type: 'foo' } as any;

    expect(softwareNameReducer(undefined, action)).toEqual(initialState);
  });

  it('should have same value after load software names', () => {

    const action = loadSoftwareNames();
    expect(softwareNameReducer(initialState, action)).toEqual(initialState);
  });

  it('should update state after load software names success', () => {
    const assemblies = [
      {
        id: '1',
        name: 'test',
        version: '1.0',
        isNative: false,
        isSoftware: true,
      }
    ];

    const action = loadSoftwareNamesSuccess({
      data: assemblies,
      origin: undefined
    });

    const expectedValue = {
      softwareNames: assemblies
    };

    expect(softwareNameReducer(initialState, action)).toEqual(expectedValue);
  });

});
