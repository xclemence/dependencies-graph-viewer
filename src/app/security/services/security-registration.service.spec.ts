import { Store } from '@ngrx/store';
import { SecurityRegistrationService } from './security-registration.service';

describe('SecurityRegistrationService', () => {
  it('should be created', () => {

    const storepy = jasmine.createSpyObj<Store>('store', ['dispatch']);
    const service = new SecurityRegistrationService([
      { features: [ { feature: 'f1', rights: [ 'r1']} ] },
      { features: [ { feature: 'f2', rights: [ 'r2']} ] },
    ], storepy);

    service.register();

    expect(storepy.dispatch).toHaveBeenCalledTimes(2);
  });
});
