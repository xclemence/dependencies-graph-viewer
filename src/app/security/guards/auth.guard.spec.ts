import { TestBed } from '@angular/core/testing';
import { UrlSegment } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { TestScheduler } from 'rxjs/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj<KeycloakService>('keycloak', ['isLoggedIn', 'login']);

    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceSpy },
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is connected', async () => {
    keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    const result = await guard.canLoad(undefined as any, []);

    expect(result).toBeTrue();
  });

  it('should redirect if no connection', async () => {
    keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(false));

    const segments = [
      new UrlSegment('test', {}),
      new UrlSegment('test2', {}),
    ];

    const result = await guard.canLoad(undefined as any, segments);

    expect(keycloakServiceSpy.login).toHaveBeenCalledWith({ redirectUri: `${window.location.origin}/test/test2` });

    expect(result).toBeFalse();
  });
});
