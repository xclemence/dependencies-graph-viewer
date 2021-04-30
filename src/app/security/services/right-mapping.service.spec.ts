import { TestBed } from '@angular/core/testing';

import { RightMappingService } from './right-mapping.service';

describe('RightMappingService', () => {
  let service: RightMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
