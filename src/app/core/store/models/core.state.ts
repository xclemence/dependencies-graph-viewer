import { BusyState } from './busy.state';
import { ErrorState } from './error.state';
import { SecurityState } from './security.state';
import { SnowState } from './snow.state';

export interface CoreState {
  busy: BusyState;
  error: ErrorState;
  snow: SnowState;
  security: SecurityState;
}
