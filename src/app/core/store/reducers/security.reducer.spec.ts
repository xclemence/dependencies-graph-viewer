import { addFeatureConfigurationAction, setCurrentUserAction, setNoRightPathAction } from '../actions';
import { securityReducer } from './security.reducer';

describe('securityReducer', () => {

  it('should have initial state', () => {
    const expected = { currentUser: undefined, featuresConfiguration: [], noRightPath: undefined };

    const action = { type: 'foo' } as any;

    expect(securityReducer(undefined, action)).toEqual(expected);
  });

  it('should add feature configuration', () => {
    const state = { currentUser: undefined, featuresConfiguration: [], noRightPath: ''  };

    const expected = {
      currentUser: undefined,
      featuresConfiguration: [
        {name: 'test', rights: [ 'r1', 'r2'] }
      ],
      noRightPath: ''
    };

    const action = addFeatureConfigurationAction({
      feature: 'test',
      rights: [ 'r1', 'r2']
    });

    expect(securityReducer(state, action)).toEqual(expected);
  });

  it('should update user', () => {
    const state = { currentUser: undefined, featuresConfiguration: [], noRightPath: ''  };

    const expected = {
      currentUser: { name: 'test', rights: [ 'r1', 'r2'] },
      featuresConfiguration: [],
      noRightPath: ''
    };

    const action = setCurrentUserAction({
      name: 'test',
      rights: [ 'r1', 'r2']
    });

    expect(securityReducer(state, action)).toEqual(expected);
  });

  it('should no right path', () => {
    const state = { currentUser: undefined, featuresConfiguration: [], noRightPath: ''  };

    const expected = { currentUser: undefined, featuresConfiguration: [], noRightPath: 'test' };

    const action = setNoRightPathAction({ path: 'test'});

    expect(securityReducer(state, action)).toEqual(expected);
  });
});
