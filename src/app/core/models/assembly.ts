export class AssemblyBase {
    public id: string;
    public name: string;
    public version: string;
    public isNative: boolean;
    public isSoftware: boolean;
}

export class AssemblyLink {
    public sourceId: string;
    public targetId: string;
}

export class Assembly extends AssemblyBase {
    public links: AssemblyLink[];
    public referencedAssemblies: AssemblyBase[];
}

export interface AssemblyStat extends AssemblyBase {
    depthMax: number;
    assemblyLinkCount: number;
}
