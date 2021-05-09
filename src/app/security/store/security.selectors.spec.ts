import { currentUserSelector, featuresRightsSelector, securityFeatureKey, securityStateSelector} from './security.selectors';

describe('security selector', () => {

  it('should extract security state', () => {
    const securityState = {
      currentUser: { name: 'name', rights: ['r'] },
      featuresConfiguration: [
        { name: 'f', rights: ['r'] }
      ],
      noRightPath: ''
    };

    const result = securityStateSelector({
      [securityFeatureKey]: securityState
    });

    expect(result).toEqual(securityState);
  });

  it('should extract current user state', () => {
    const securityState = {
      currentUser: { name: 'name', rights: ['r'] },
      featuresConfiguration: [
        { name: 'f', rights: ['r'] }
      ],
      noRightPath: ''
    };

    const result = currentUserSelector({
      [securityFeatureKey]: securityState
    });

    expect(result).toEqual({ name: 'name', rights: ['r'] });
  });

  it('should extract features rights state', () => {
    const securityState = {
      currentUser: { name: 'name', rights: ['r'] },
      featuresConfiguration: [
        { name: 'f', rights: ['r'] }
      ],
      noRightPath: ''
    };

    const result = featuresRightsSelector({
      [securityFeatureKey]: securityState
    });

    expect(result).toEqual([{ name: 'f', rights: ['r'] }]);
  });

});
