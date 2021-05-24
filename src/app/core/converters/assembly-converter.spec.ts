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

    expect(result.id).withContext('bad id mapping').toBe(input.name);
    expect(result.version).withContext('bad version mapping').toBe(input.version);
    expect(result.name).withContext('bad name mapping').toBe(input.shortName);
    expect(result.isNative).withContext('bad isNative mapping').toBe(input.isNative);
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

    expect(result.depthMax).withContext('bad depthMax mapping').toBe(input.maxDepth);
    expect(result.assemblyLinkCount).withContext('bad assemblyLinkCount mapping').toBe(input.directReferenceCount);
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

    expect(result.referencedAssemblies.length).withContext('referenced assemblies length').toBe(2);
    expect(result.links.length).withContext('links number').toBe(3);
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

    expect(result.links.length).withContext('links number').toBe(1);
  });

});
