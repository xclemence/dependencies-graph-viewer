import {
  assembliesStateSelector,
  assemblyDepthMaxStateSelector,
  assemblyDepthStateSelector,
  assemblyFeatureKey,
  assemblyStateSelector,
} from './assembly.selectors';
import { AssemblyFiltered, AssemblyState } from './models';

describe('assembly selector', () => {

  it('should extract global assembly state', () => {
    const assemblyState: AssemblyState = {
      assemblies: {
        filtered: [
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
        count: 1
      },
      assemblyDepth: {
        id: '1',
        name: 'test',
        version: '1.0',
        isNative: false,
        isSoftware: true,
        links: [],
        referencedAssemblies: []
      },
      assemblyDepthMax: undefined
    };

    const extractState = assemblyStateSelector({
      [assemblyFeatureKey]: assemblyState
    });

    expect(extractState).toEqual(assemblyState);
  });

  it('should extract assemblies state', () => {
    const assemblyFiltered: AssemblyFiltered = {
      filtered: [
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
      count: 1
    };

    const result = assembliesStateSelector({
      [assemblyFeatureKey]: {
        assemblies: assemblyFiltered
      }
    });

    expect(result).toEqual(assemblyFiltered);
  });

  it('should extract assembly depth state', () => {
    const assembly = {
      id: '1',
      name: 'test',
      version: '1.0',
      isNative: false,
      isSoftware: true,
      links: [],
      referencedAssemblies: []
    };

    const result = assemblyDepthStateSelector({
      [assemblyFeatureKey]: {
        assemblyDepth: assembly
      }
    });

    expect(result).toEqual(assembly);
  });


  it('should extract assembly depth max state', () => {
    const value = {
      assemblyId: 'test',
      value: 123
    };

    const result = assemblyDepthMaxStateSelector({
      [assemblyFeatureKey]: {
        assemblyDepthMax: value
      }
    });

    expect(result).toEqual(value);
  });
});
