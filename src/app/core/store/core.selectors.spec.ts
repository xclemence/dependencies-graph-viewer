import { busyStateSelector, coreFeatureKey, coreStateSelector, errorStateSelector } from './core.selectors';
import { BusyState, CoreState, ErrorState } from './models';

describe('errorReducer', () => {

  it('should extract core state', () => {
    const coreState: CoreState = {
      busy: { actionsInProgress: [] },
      error: { lastError: 'test ' }
    };

    const extractState = coreStateSelector({
      [coreFeatureKey]: coreState
    });

    expect(extractState).toEqual(coreState);
  });

  it('should extract busy state', () => {
    const busyState: BusyState = { actionsInProgress: ['busy'] };

    const result = busyStateSelector({
      [coreFeatureKey]: {
        busy: busyState,
        error: { lastError: 'test ' }
      }
    });

    expect(result).toEqual(busyState);
  });

  it('should extract error state', () => {
    const errorState: ErrorState = { lastError: 'test ' };

    const result = errorStateSelector({
      [coreFeatureKey]: {
        busy: { actionsInProgress: ['busy'] },
        error: { lastError: 'test ' }
      }
    });

    expect(result).toEqual(errorState);
  });
});
