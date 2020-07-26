import { operationFailure } from '../actions/error.actions';
import { ErrorState } from '../models';
import { errorReducer } from './error.reducer';

describe('errorReducer', () => {

  it('should have initial state', () => {
    const expected = { lastError: undefined };
    const action = { type: 'foo' } as any;

    expect(errorReducer(undefined, action)).toEqual(expected);
  });

  it('should have last error value', () => {
    const state: ErrorState = { lastError: 'hello' };

    const errorMessage = 'one error';
    const expected = { lastError: errorMessage };
    const action = operationFailure({
      error: errorMessage,
      origin: { type: 'Action' }
    });

    expect(errorReducer(state, action)).toEqual(expected);
  });
});
