import { TestBed } from '@angular/core/testing';

import { SortDefinitionConvertorService } from './sort-definition-convertor.service';

describe('SortDefinitionConvertorService', () => {
  let service: SortDefinitionConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortDefinitionConvertorService);
  });

  it('should retrieve value', () => {
    const order = service.getAssemblyServiceOrder('type', 'asc');
    expect(order).toBe('isNative_asc');
  });

  it('should retrieve default value from undefined', () => {
    const order = service.getAssemblyServiceOrder(undefined, undefined);
    expect(order).toBe('shortName_asc');
  });

  it('should retrieve default value from null', () => {
    const order = service.getAssemblyServiceOrder(null, null);
    expect(order).toBe('shortName_asc');
  });

  it('no error if no value found', () => {
    const order = service.getAssemblyServiceOrder('hello', 'test');
    expect(order).toBe('undefined_undefined');
  });

});
