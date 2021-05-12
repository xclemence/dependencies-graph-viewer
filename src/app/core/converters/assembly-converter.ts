import { Assembly, AssemblyBase, AssemblyLink, AssemblyStat } from '@app/core/models';

export class AssemblyConverter {

    static toAssemblyBase<T extends AssemblyBase>(item: any): T {
        return { id: item.name, version: item.version, name: item.shortName, isNative: item.isNative } as T;
    }

    static toAssembly(item: any): Assembly {

        const assembly = AssemblyConverter.toAssemblyBase<Assembly>(item);

        assembly.referencedAssemblies = item.allReferencedAssemblies.map((x: any) => this.toAssemblyBase<AssemblyBase>(x));

        const links = item.allReferencedAssembliesLinks.map((x: any) => ({ sourceId: x.source, targetId: x.target }));

        assembly.links = AssemblyConverter.filterBadLinks(links, assembly.referencedAssemblies);

        return assembly;
    }

    static filterBadLinks(assemblyLinks: AssemblyLink[], knownAssemblies: AssemblyBase[]): AssemblyLink[] {
        const assembliesIds = knownAssemblies.map(x => x.id);
        return assemblyLinks.filter(x => assembliesIds.includes(x.targetId));
    }

    static toAssemblyStat(item: any): AssemblyStat {

        const assembly = AssemblyConverter.toAssemblyBase<AssemblyStat>(item);
        assembly.depthMax = item.maxDepth;
        assembly.assemblyLinkCount = item.directReferenceCount;

        return assembly;
    }

    static toAssemblyLinks(sourceId: any, items: any): AssemblyLink[] {
        return items.map((x: any) => ({ sourceId, targetId: x.name }));
    }
}
