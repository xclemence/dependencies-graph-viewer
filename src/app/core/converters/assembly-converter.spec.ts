import { AssemblyConverter } from './assembly-converter';

describe('AssemblyConverter', () => {

  it('create assembly base', () => {

    const input = {
      name: 'name',
      version: '1.2',
      shortName: 'short name',
      isNative : true
    };

    const result = AssemblyConverter.toAssemblyBase(input);

    expect(result.id).toBe(input.name, 'bad id mapping');
    expect(result.version).toBe(input.version, 'bad version mapping');
    expect(result.name).toBe(input.shortName, 'bad name mapping');
    expect(result.isNative).toBe(input.isNative, 'bad isNative mapping');
  });

  it('create assembly stat', () => {

    const input = {
      name: 'name',
      version: '1.2',
      shortName: 'short name',
      isNative : true,
      maxDepth: 12,
      directReferenceCount: 120
    };

    const result = AssemblyConverter.toAssemblyStat(input);

    expect(result.depthMax).toBe(input.maxDepth, 'bad depthMax mapping');
    expect(result.assemblyLinkCount).toBe(input.directReferenceCount, 'bad assemblyLinkCount mapping');
  });

  it('create assembly', () => {

    const input = {
      name: 'name',
      version: '1.2',
      shortName: 'short name',
      isNative : true,
      allReferencedAssemblies: [
        { name: 'name2', version: '3'},
        { name: 'name3', version: '4'}
      ],
      allReferencedAssembliesLinks: [
        {source: 'name', target: 'name2'},
        {source: 'name', target: 'name3'},
        {source: 'name2', target: 'name3'}
      ]
    };

    const result = AssemblyConverter.toAssembly(input);

    expect(result.referencedAssemblies.length).toBe(2, 'referenced assemblies length');
    expect(result.links.length).toBe(3, 'links number');
  });


  it('create assembly with bad target link', () => {

    const input = {
      name: 'name',
      version: '1.2',
      shortName: 'short name',
      isNative : true,
      allReferencedAssemblies: [
        { name: 'name2', version: '3'}
      ],
      allReferencedAssembliesLinks: [
        {source: 'name', target: 'name2'},
        {source: 'name2', target: 'badTarget'}
      ]
    };

    const result = AssemblyConverter.toAssembly(input);

    expect(result.links.length).toBe(1, 'links number');
  });

});
