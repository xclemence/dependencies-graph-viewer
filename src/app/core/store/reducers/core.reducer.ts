import { busyIndicatorReducer } from './busy-indicator.reducer';
import { errorReducer } from './error.reducer';
import { securityReducer } from './security.reducer';
import { snowReducer } from './snow.reducer';

export const reducers = {
  busy: busyIndicatorReducer,
  error: errorReducer,
  snow: snowReducer,
  security: securityReducer,
};
