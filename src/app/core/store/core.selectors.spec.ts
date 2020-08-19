import { snowStateSelector } from '@app/core/store/core.selectors';

import { busyStateSelector, coreFeatureKey, coreStateSelector, errorStateSelector } from './core.selectors';
import { BusyState, CoreState, ErrorState } from './models';
import { SnowState } from './models/snow.state';

describe('core selector', () => {

  it('should extract core state', () => {
    const coreState: CoreState = {
      busy: { actionsInProgress: [] },
      error: { lastError: 'test ' },
      snow: undefined
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

  it('should extract snow state', () => {
    const snowState: SnowState = { activated: true };

    const result = snowStateSelector({
      [coreFeatureKey]: {
        busy: { actionsInProgress: ['busy'] },
        error: { lastError: 'test ' },
        snow: { activated: true }
      }
    });

    expect(result).toEqual(snowState);
  });
});
