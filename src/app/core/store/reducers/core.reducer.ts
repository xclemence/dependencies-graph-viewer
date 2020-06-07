import { busyIndicatorReducer } from './busy-indicator.reducer';
import { errorReducer } from './error.reducer';

export const reducers = {
  busy: busyIndicatorReducer,
  error: errorReducer
};
