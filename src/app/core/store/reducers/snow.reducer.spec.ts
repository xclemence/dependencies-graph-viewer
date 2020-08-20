import { SnowState } from '../models';
import { snowActivation } from './../actions/snow.actions';
import { snowReducer } from './snow.reducer';

describe('snowReducer', () => {

  it('should have initial state', () => {
    const expected = { activated: false };
    const action = { type: 'foo' } as any;

    expect(snowReducer(undefined, action)).toEqual(expected);
  });

  it('should extract snow activated value', () => {
    const state: SnowState = { activated: false };

    const expected = { activated: true };
    const action = snowActivation();

    expect(snowReducer(state, action)).toEqual(expected);
  });
});
