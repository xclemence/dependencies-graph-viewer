import { Store } from '@ngrx/store';
import { SecurityRegistrationService } from './security-registration.service';

describe('SecurityRegistrationService', () => {
  it('should be created', () => {

    const storeSpy = jasmine.createSpyObj<Store>('store', ['dispatch']);
    const service = new SecurityRegistrationService([
      { features: [ { feature: 'f1', rights: [ 'r1']} ] },
      { features: [ { feature: 'f2', rights: [ 'r2']} ] },
    ], 'redirect', storeSpy);

    service.register();

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(3);
  });
});
