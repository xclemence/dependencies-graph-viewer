import { TestBed } from '@angular/core/testing';

import { SortDefinitionConverterService } from './sort-definition-converter.service';

describe('SortDefinitionConverterService', () => {
  let service: SortDefinitionConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortDefinitionConverterService);
  });

  it('should retrieve value', () => {
    const order = service.getAssemblyServiceOrder('type', 'asc');
    expect(order).toBe('isNative_asc');
  });

  it('should retrieve default value from null', () => {
    const order = service.getAssemblyServiceOrder(undefined, undefined);
    expect(order).toBe('shortName_asc');
  });

  it('no error if no value found', () => {
    const order = service.getAssemblyServiceOrder('hello', 'test');
    expect(order).toBe('undefined_undefined');
  });

});
