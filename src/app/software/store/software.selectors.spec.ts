import { SoftwareNameState, SoftwareState } from './models';
import {
  filteredAssembliesStateSelector,
  softwareAssembliesStateSelector,
  softwareFeatureKey,
  softwareNameStateSelector,
  softwareSelector,
  softwareStateSelector,
} from './software.selectors';


describe('software selector', () => {

  it('should extract global software state', () => {
    const softwareState: SoftwareState = {
      assemblies: {
        software: {
          id: '1',
          name: 'test',
          version: '1.0',
          isNative: false,
          isSoftware: true,
          links: [],
          referencedAssemblies: []
        },
        filteredAssemblies: []
      },
      name: {
        softwareNames: []
      }
    };

    const extractState = softwareStateSelector({
      [softwareFeatureKey]: softwareState
    });

    expect(extractState).toEqual(softwareState);
  });

  it('should extract sotware name state', () => {
    const sotwareName: SoftwareNameState = {
      softwareNames: [
        {
          id: '1',
          name: 'test',
          version: '1.0',
          isNative: false,
          isSoftware: true,
        }
      ]
    };

    const result = softwareNameStateSelector({
      [softwareFeatureKey]: {
        name: sotwareName
      }
    });

    expect(result).toEqual(sotwareName);
  });

  it('should extract software assemblies state', () => {
    const sotwareAssemblies = {
      software: {
        id: '1',
        name: 'test',
        version: '1.0',
        isNative: false,
        isSoftware: true,
        links: [],
        referencedAssemblies: []
      },
      filteredAssemblies: []
    };

    const result = softwareAssembliesStateSelector({
      [softwareFeatureKey]: {
        assemblies: sotwareAssemblies
      }
    });

    expect(result).toEqual(sotwareAssemblies);
  });

  it('should extract filtered assemblies state', () => {

    const filteredAssemblies = [ 'test1', 'test2' ];

    const result = filteredAssembliesStateSelector({
      [softwareFeatureKey]: {
        assemblies: {
          filteredAssemblies
        }
      }
    });

    expect(result).toEqual(filteredAssemblies);
  });

  it('should extract software state', () => {

    const software =  {
      id: '1',
      name: 'test',
      version: '1.0',
      isNative: false,
      isSoftware: true,
      links: [],
      referencedAssemblies: []
    };

    const result = softwareSelector({
      [softwareFeatureKey]: {
        assemblies: {
          software
        }
      }
    });

    expect(result).toEqual(software);
  });
});
