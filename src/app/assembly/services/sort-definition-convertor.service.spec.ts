import { TestBed } from '@angular/core/testing';

import { SortDefinitionConvertorService } from './sort-definition-convertor.service';

describe('SortDefinitionConvertorService', () => {
  let service: SortDefinitionConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortDefinitionConvertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
