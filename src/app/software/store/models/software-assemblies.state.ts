import { Assembly } from '@app/core/models';

export interface SoftwareAssembliesState {
    software: Assembly;
    filteredAssemblies: string[];
    displayLabel: boolean;
}
