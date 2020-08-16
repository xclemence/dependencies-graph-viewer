import { NgModule } from '@angular/core';
import { AssemblyService } from '@app/assembly/services/assembly.service';
import { SoftwareService } from '@app/software/services/software.service';

import { AssemblyMockService } from './services/assembly-mock.service';
import { SoftwareMockService } from './services/software-mock.service';

@NgModule({
  providers: [
    { provide: SoftwareService, useClass: SoftwareMockService },
    { provide: AssemblyService, useClass: AssemblyMockService }
  ]
})
export class MockModule { }
