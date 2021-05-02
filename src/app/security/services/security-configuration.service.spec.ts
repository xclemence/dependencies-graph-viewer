import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { KeycloakService } from 'keycloak-angular';
import { RightMappingService } from './right-mapping.service';

import { SecurityConfigurationService } from './security-configuration.service';

describe('SecurityConfigurationService', () => {
  let service: SecurityConfigurationService;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;
  let mappingServiceSpy: jasmine.SpyObj<RightMappingService>;

  const initialState = {
    assembly: {
      assemblies: {
        filtered: undefined,
        count: 0
      }
    },
    core: {
      busy: {
        actionsInProgress: []
      },
      security: {

      }
    }
  };

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj<KeycloakService>('keycloak', ['init', 'isLoggedIn', 'getUsername', 'getUserRoles']);
    mappingServiceSpy = jasmine.createSpyObj<RightMappingService>('mapping', ['getApplicationRight']);

    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceSpy },
        { provide: RightMappingService, useValue: mappingServiceSpy },
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(SecurityConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
