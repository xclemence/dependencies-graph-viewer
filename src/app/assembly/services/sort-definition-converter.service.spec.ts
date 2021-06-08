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
    expect(order).toEqual({isNative: 'ASC'});
  });

  it('should retrieve default value from null', () => {
    const order = service.getAssemblyServiceOrder(undefined, undefined);
    expect(order).toEqual({shortName: 'ASC'});
  });

  it('no error if no value found', () => {
    const order = service.getAssemblyServiceOrder('hello', 'ASC');
    expect(order).toEqual({});
  });

});
