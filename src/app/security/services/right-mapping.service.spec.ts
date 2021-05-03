import { environment } from 'environments/environment';

import { RightMappingService } from './right-mapping.service';

describe('RightMappingService', () => {

  it('should find corresponding right', () => {
    const service = new RightMappingService();
    environment.security.rightMapping = [
      {app: 'app1', server:'s1'}
    ]

    const result = service.getApplicationRight('s1');

    expect(result).toEqual('app1');
  });

  it('should have no corresponding right', () => {
    const service = new RightMappingService();
    environment.security.rightMapping = [
      {app: 'app1', server:'s1'}
    ]

    const result = service.getApplicationRight('s2');

    expect(result).toEqual('s2');
  });
});
