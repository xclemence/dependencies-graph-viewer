import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';

import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ConfigurationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('update environment with configuration file', async () => {

    const resultPromise = service.load(true);
    const mockReq = httpMock.expectOne('/assets/config.json');

    mockReq.flush({
      assemblyGraphqlUri: 'http://localhost:12345'
    });

    const result = await resultPromise;
    expect(result).toBeTrue();

    expect(environment.assemblyGraphqlUri).toBe('http://localhost:12345');
  });

  it('generate an error return false value', async () => {

    const resultPromise = service.load(true);
    const mockReq = httpMock.expectOne('/assets/config.json');

    mockReq.error(new ErrorEvent('one error'));

    const result = await resultPromise;
    expect(result).toBeFalse();
  });

  it('dev mode should not call config file', async () => {

    const result = await service.load(false);

    httpMock.expectNone('/assets/config.json');
    expect(result).toBeTrue();
  });
});
