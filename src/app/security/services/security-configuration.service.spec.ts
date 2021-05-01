import { TestBed } from '@angular/core/testing';

import { SecurityConfigurationService } from './security-configuration.service';

describe('SecurityConfigurationService', () => {
  let service: SecurityConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
