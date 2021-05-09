import { busyIndicatorReducer } from './busy-indicator.reducer';
import { errorReducer } from './error.reducer';
import { snowReducer } from './snow.reducer';

export const reducers = {
  busy: busyIndicatorReducer,
  error: errorReducer,
  snow: snowReducer,
};
