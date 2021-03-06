import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@app/core/services/configuration.service';
import { ConfigurationServiceMock } from '@app/core/services/configuration.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { KeycloakService } from 'keycloak-angular';
import { setCurrentUserAction } from '../store/actions';
import { RightMappingService } from './right-mapping.service';

import { SecurityConfigurationService } from './security-configuration.service';

describe('SecurityConfigurationService', () => {
  let service: SecurityConfigurationService;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;
  let mappingServiceSpy: jasmine.SpyObj<RightMappingService>;
  let mockStore: MockStore;
  let configService: ConfigurationService;

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
    },
    security: { }
  };

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj<KeycloakService>('keycloak', ['init', 'isLoggedIn', 'getUsername', 'getUserRoles']);
    mappingServiceSpy = jasmine.createSpyObj<RightMappingService>('mapping', ['getApplicationRight']);

    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceSpy },
        { provide: RightMappingService, useValue: mappingServiceSpy },
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },

        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(SecurityConfigurationService);
    mockStore = TestBed.inject(MockStore);
    configService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not initialise security if not enabled', async () => {
    configService.configuration.security.enabled = false;

    await service.configure('test');

    expect(keycloakServiceSpy.init).not.toHaveBeenCalled();
    expect(keycloakServiceSpy.isLoggedIn).not.toHaveBeenCalled();
  });

  it('should initialise security without user', async () => {
    configService.configuration.security.enabled = true;

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(false));

    await service.configure('test');

    expect(keycloakServiceSpy.init).toHaveBeenCalled();
    expect(keycloakServiceSpy.isLoggedIn).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should initialise security and user', async () => {
    configService.configuration.security.enabled = true;

    const dispatchSpy = spyOn(mockStore, 'dispatch');

    keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    keycloakServiceSpy.getUsername.and.returnValue('name');
    keycloakServiceSpy.getUserRoles.and.returnValue(['test']);
    mappingServiceSpy.getApplicationRight.and.returnValue('test');

    await service.configure('test');

    expect(keycloakServiceSpy.init).toHaveBeenCalled();
    expect(keycloakServiceSpy.isLoggedIn).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentUserAction({
      name: 'name',
      rights: ['test']
    }));

  });

});
