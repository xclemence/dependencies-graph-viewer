import { Injectable } from '@angular/core';

import { Assembly, AssemblyLink } from '../models/assembly';

@Injectable({
  providedIn: 'root'
})
export class AssemblyMockProvider {

  private currentIndexNumber = 0;

  public getMockDataRand(maxNumber: number): Assembly {
    const startNumber = this.currentIndexNumber;
    const assembly = { id: `${this.currentIndexNumber}`, name: 'test', version: '1', isSoftware: true} as Assembly;
    this.currentIndexNumber++;

    const refNumber = this.randomInt(10, maxNumber);

    assembly.referencedAssemblies = new Array<Assembly>();
    for (let i = 2; i <= refNumber; ++i ) {
      assembly.referencedAssemblies.push({ id: `${this.currentIndexNumber}`, name: `Assembly ${i}`, version: `v.1.0.${i}`,
                                         isSoftware: false, isNative : this.randomInt(0, 4) === 3} as Assembly);

      this.currentIndexNumber++;
    }

    const linkNumer = this.randomInt(5, refNumber * 2);

    assembly.links = new Array<AssemblyLink>();

    for (let i = 0; i < linkNumer; ++i ) {
      const sourceId = this.randomInt(startNumber, this.currentIndexNumber - 1);
      let targetId = this.randomInt(startNumber, this.currentIndexNumber - 1);

      while (targetId === sourceId) {
        targetId = this.randomInt(startNumber, this.currentIndexNumber - 1);
      }

      assembly.links.push({ sourceId: `${sourceId}`, targetId: `${targetId}`} as AssemblyLink);
    }

    return assembly;
  }

  public getMockDataStatic(): Assembly {
    const jsonData = {
      id: '0',
      name: 'test',
      version: '1',
      isSoftware: true,
      referencedAssemblies: [
        { id: '2', name: 'assembly 2', version: '1.0.0'},
        { id: '3', name: 'assembly 3', version: '1.0.0'},
        { id: '4', name: 'assembly 4', version: '1.0.0'},
        { id: '5', name: 'assembly 5', version: '1.0.0'},
        { id: '6', name: 'assembly 6', version: '1.0.0', isNative: true},
        { id: '7', name: 'assembly 7', version: '1.0.0'},
      ],
      links: [
        { sourceId: '1', targetId: '2'},
        { sourceId: '1', targetId: '3'},
        { sourceId: '2', targetId: '4'},
        { sourceId: '2', targetId: '3'},
        { sourceId: '1', targetId: '5'},
        { sourceId: '5', targetId: '6'},
        { sourceId: '1', targetId: '7'},
        { sourceId: '6', targetId: '7'},
      ]
    };
    return jsonData as Assembly;
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
