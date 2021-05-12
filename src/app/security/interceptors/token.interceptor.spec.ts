import { HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj<KeycloakService>('keycloak', ['getKeycloakInstance']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        { provide: KeycloakService, useValue: keycloakServiceSpy },
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should add Authorization', () => {

    keycloakServiceSpy.getKeycloakInstance.and.returnValue({token: 'teststs'} as any);

    httpClient.get('api/test').subscribe();

    const request = httpTestingController.expectOne('api/test');
    request.flush([]);

    expect(request.request.headers.get('Authorization')).toBeDefined();
  });

  it('should not add Authorization (no token)', () => {

    keycloakServiceSpy.getKeycloakInstance.and.returnValue({token: undefined} as any);

    httpClient.get('api/test').subscribe();
    const request = httpTestingController.expectOne('api/test');
    request.flush([]);

    expect(request.request.headers.get('Authorization')).toBeNull();
  });

});
