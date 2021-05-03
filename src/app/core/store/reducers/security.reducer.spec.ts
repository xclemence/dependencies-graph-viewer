import { addFeatureConfigurationAction, setCurrentUserAction } from '../actions';
import { operationFailure } from '../actions/error.actions';
import { ErrorState } from '../models';
import { errorReducer } from './error.reducer';
import { securityReducer } from './security.reducer';

describe('securityReducer', () => {

  it('should have initial state', () => {
    const expected = { currentUser: undefined, featuresConfiguration: [] };;

    const action = { type: 'foo' } as any;

    expect(securityReducer(undefined, action)).toEqual(expected);
  });

  it('should add feature configuration', () => {
    const state = { currentUser: undefined, featuresConfiguration: [] };

    const expected = {
      currentUser: undefined,
      featuresConfiguration: [
        {name: 'test', rights: [ 'r1', 'r2'] }
      ]
    };

    const action = addFeatureConfigurationAction({
      feature: 'test',
      rights: [ 'r1', 'r2']
    });

    expect(securityReducer(state, action)).toEqual(expected);
  });

  it('should update user', () => {
    const state = { currentUser: undefined, featuresConfiguration: [] };

    const expected = {
      currentUser: { name: 'test', rights: [ 'r1', 'r2'] },
      featuresConfiguration: []
    };

    const action = setCurrentUserAction({
      name: 'test',
      rights: [ 'r1', 'r2']
    });

    expect(securityReducer(state, action)).toEqual(expected);
  });
});
