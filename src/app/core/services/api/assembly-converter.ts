import { filter } from 'rxjs/operators';
import { AssemblyBase, AssemblyLink, Assembly, AssemblyStat } from '@app/core/models';

export class AssemblyConverter {

    static toAssemblyBase<T extends AssemblyBase>(item: any): T {
        return <T>{ id: item.name, version: item.version, name: item.shortName, isNative: item.isNative };
    }

    static toAssembly(item: any): Assembly {

        const assembly = AssemblyConverter.toAssemblyBase<Assembly>(item);

        assembly.referencedAssemblies = item.allReferencedAssemblies.map((x: any) => this.toAssemblyBase<AssemblyBase>(x));

       const links = [
            ...AssemblyConverter.toAssemblyLinks(assembly.id, item.directReferencedAssemblies),
            ...item.allReferencedAssemblies.flatMap(x => AssemblyConverter.toAssemblyLinks(x.name, x.directReferencedAssemblies))
        ];
        assembly.links = AssemblyConverter.filterBadLinks(links, assembly.referencedAssemblies);
        return assembly;
    }

    static filterBadLinks(assemblyLinks: AssemblyLink[],  knowedAssemblies: AssemblyBase[]): AssemblyLink[] {
        const assembliesIds = knowedAssemblies.map(x => x.id);
        return assemblyLinks.filter(x => assembliesIds.includes(x.targetId));
    }

    static toAssemblyStat(item: any): AssemblyStat {

        const assembly = AssemblyConverter.toAssemblyBase<AssemblyStat>(item);
        assembly.depthMax = item.maxDepth;
        assembly.assemblyLinkCount = item.directReferenceCount;

        return assembly;
    }

    static toAssemblyLinks(sourceId: any, items: any): AssemblyLink[] {
        return items.map(x => <AssemblyLink>{ sourceId, targetId: x.name });
    }
}
