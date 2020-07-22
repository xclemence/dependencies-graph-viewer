import { loadAssemblies, loadAssembliesSuccess, loadAssemblyDepth, loadAssemblyDepthSuccess } from '../actions';
import { assemblyReducer } from './assembly.reducer';

describe('assemblyReducer', () => {

  const initialValue = {
    assemblyDepth: undefined,
    assemblies: {
      filtered: [],
      count: 0
    },
  };

  it('should have initial state', () => {
    const action = { type: 'foo' } as any;

    expect(assemblyReducer(undefined, action)).toEqual(initialValue);
  });

  it('should have some value after loadAssemblies', () => {

    const action = loadAssemblies({
      filter: '',
      order: '',
      page: 3,
      take: 10
    });

    expect(assemblyReducer(initialValue, action)).toEqual(initialValue);
  });

  it('should have same value after loadAssemblies', () => {

    const action = loadAssemblies({
      filter: '',
      order: '',
      page: 3,
      take: 10
    });

    expect(assemblyReducer(initialValue, action)).toEqual(initialValue);
  });

  it('should update state after load assemblies success', () => {
    const assemblyCount = 3;
    const assemblies = [
      {
        id: '1',
        name: 'test',
        version: '1.0',
        isNative: false,
        isSoftware: true,
        depthMax: 3,
        assemblyLinkCount: 10
      }
    ];

    const action = loadAssembliesSuccess({
      data: assemblies,
      assembliesCount: assemblyCount,
      origin: undefined
    });

    const expectedValue = {
      assemblyDepth: undefined,
      assemblies: {
        filtered: assemblies,
        count: assemblyCount
      },
    };

    expect(assemblyReducer(initialValue, action)).toEqual(expectedValue);
  });

  it('should have same value after loadAssemblyDepth', () => {

    const action = loadAssemblyDepth({
      assemblyId: '2',
      depth: 10
    });

    expect(assemblyReducer(initialValue, action)).toEqual(initialValue);
  });

  it('should update state after load assembly depth success', () => {
    const assembly = {
      id: '1',
      name: 'name1',
      version: '1.0',
      isNative: false,
      isSoftware: false,
      links: [ ],
      referencedAssemblies: [ ]
    };

    const action = loadAssemblyDepthSuccess({
      data: assembly,
      origin: undefined
    });

    const expectedValue = {
      assemblyDepth: assembly,
      assemblies: {
        filtered: [],
        count: 0
      }
    };

    expect(assemblyReducer(initialValue, action)).toEqual(expectedValue);
  });
});