import { BusyState } from './busy.state';
import { ErrorState } from './error.state';

export interface CoreState {
  busy: BusyState;
  error: ErrorState;
}
