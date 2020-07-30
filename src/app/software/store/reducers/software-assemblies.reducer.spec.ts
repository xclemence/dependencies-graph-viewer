import {
  clearSoftwareAssemblies,
  loadSoftwareAssemblies,
  loadSoftwareAssembliesSuccess,
  updateFilteredAssemblies,
} from '../actions';
import { softwareAssembliesReducer } from './software-assemblies.reducer';

describe('softwareAssembliesReducer', () => {

  const initialState = {
    software: undefined,
    filteredAssemblies: []
  };

  const assemblyTest = {
    id: '1',
    name: 'test',
    version: '1.0',
    isNative: false,
    isSoftware: true,
  };

  it('should have initial state', () => {
    const action = { type: 'foo' } as any;

    expect(softwareAssembliesReducer(undefined, action)).toEqual(initialState);
  });

  it('should have same value after load software assemblies', () => {

    const action = loadSoftwareAssemblies({ assemblyName: assemblyTest });
    expect(softwareAssembliesReducer(initialState, action)).toEqual(initialState);
  });

  it('should update state after load software assemblies success', () => {
    const resultAssembly = {
      ...assemblyTest,
      links: [],
      referencedAssemblies: []
    };

    const state = {
      ...initialState,
      filteredAssemblies: [ 'test1']
    };

    const action = loadSoftwareAssembliesSuccess({
      data: resultAssembly,
      origin: undefined
    });

    const expectedValue = {
      software: resultAssembly,
      filteredAssemblies: []
    };

    expect(softwareAssembliesReducer(state, action)).toEqual(expectedValue);
  });

  it('should clear software assemblies', () => {
    const state = {
      ...initialState,
      filteredAssemblies: [ 'test1']
    };

    const action = clearSoftwareAssemblies();

    const expectedValue = {
      software: undefined,
      filteredAssemblies: []
    };

    expect(softwareAssembliesReducer(state, action)).toEqual(expectedValue);
  });

  it('should update filtered assemblies', () => {

    const action = updateFilteredAssemblies({
      assemblyIds: ['test1', 'test2']
    });

    const expectedValue = {
      ...initialState,
      filteredAssemblies: ['test1', 'test2']
    };

    expect(softwareAssembliesReducer(initialState, action)).toEqual(expectedValue);
  });

});