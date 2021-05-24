import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@app/core/services/configuration.service';
import { ConfigurationServiceMock } from '@app/core/services/configuration.service.mock';

import { RightMappingService } from './right-mapping.service';

describe('RightMappingService', () => {
  let service: RightMappingService;
  let configService: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide : ConfigurationService, useClass: ConfigurationServiceMock }
      ]
    });
    service = TestBed.inject(RightMappingService);
    configService = TestBed.inject(ConfigurationService);
  });

  it('should find corresponding right', () => {
    configService.configuration.security.rightMapping = [
      {app: 'app1', server: 's1'}
    ];

    const result = service.getApplicationRight('s1');

    expect(result).toEqual('app1');
  });

  it('should have no corresponding right', () => {
    configService.configuration.security.rightMapping = [
      {app: 'app1', server: 's1'}
    ];

    const result = service.getApplicationRight('s2');

    expect(result).toEqual('s2');
  });
});
