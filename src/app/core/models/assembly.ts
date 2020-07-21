export interface AssemblyBase {
    id: string;
    name: string;
    version: string;
    isNative: boolean;
    isSoftware: boolean;
}

export interface AssemblyLink {
    sourceId: string;
    targetId: string;
}

export interface Assembly extends AssemblyBase {
    links: AssemblyLink[];
    referencedAssemblies: AssemblyBase[];

}

export interface AssemblyStat extends AssemblyBase {
    depthMax: number;
    assemblyLinkCount: number;
}

export class AssemblyColors {
    public static main = 'red';
    public static native = 'lightGreen';
    public static managed = 'lightBlue';
}
