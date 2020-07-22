import { Injectable } from '@angular/core';
import { Assembly, AssemblyLink, AssemblyStat } from '@app/core/models/assembly';
import { AssemblyMockProvider } from '@app/test/assembly.mock-provider';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AssemblyMockService {

  saveAssembly = new Map<string, Assembly>();

  constructor(private provider: AssemblyMockProvider) { }

  assemblyStatistics(take: number, page: number): Observable<AssemblyStat[]> {
    return of(this.getMockData()).pipe(delay(1000));
  }

  private getMockData(): AssemblyStat[] {
    const assemblies = new Array<AssemblyStat>();

    for (let i = 0; i < 30; ++i) {
      assemblies.push({
        id: `${i}`,
        name: `assembly ${i}`,
        version: `1.0.${i}`,
        isNative: this.provider.randomInt(0, 4) === 3,
        isSoftware: this.provider.randomInt(0, 4) === 3,
        depthMax: this.provider.randomInt(20, 100),
        assemblyLinkCount: this.provider.randomInt(20, 100)
      });
    }

    return assemblies;
  }

  references(id: string, depth: number): Observable<Assembly> {
    let assembly: Assembly;

    if (id === '0') {
      assembly = this.provider.getMockDataStatic();
    } else if (!this.saveAssembly.has(id)) {
      assembly = this.provider.getMockDataRand(75);
      this.saveAssembly.set(id, assembly);
    } else {
      assembly = this.saveAssembly.get(id);
    }

    return of(this.getdepth(assembly, depth)).pipe(delay(1000));
  }

  getdepth(assembly: Assembly, depth: number): Assembly {
    const newAssembly = new Assembly();

    Object.assign(newAssembly, assembly);
    newAssembly.links = new Array<AssemblyLink>();

    let searchIds = [assembly.id];
    let nextSearchIds: Array<string>;
    for (let i = 0; i < depth; ++i) {
      nextSearchIds = [];
      for (const id of searchIds) {
        const ref = assembly.links.filter(x => x.sourceId === id);
        newAssembly.links.push(...ref);

        nextSearchIds.push(...ref.map(x => x.targetId));
      }
      searchIds = nextSearchIds;
    }

    const distinctIds = newAssembly.links.map(x => x.targetId)
      .concat(newAssembly.links.map(x => x.sourceId))
      .filter(x => x !== assembly.id);

    newAssembly.referencedAssemblies = assembly.referencedAssemblies.filter(x => distinctIds.some(i => i === x.id));

    return newAssembly;
  }
}
