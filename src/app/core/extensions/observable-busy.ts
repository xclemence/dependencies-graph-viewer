import { removeBusyIndicatorAction } from '@app/core/store/actions/busy-indicator.actions';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { addBusyIndicatorAction } from '../store/actions';

declare module 'rxjs' {
  export interface Observable<T> {
    executeWithMainBusy(store: Store): Observable<T>;
  }
}
function executeWithMainBusy<T>(operation: Observable<T>, store: Store): Observable<T>  {
  return of(null).pipe(
    tap(x => store.dispatch(addBusyIndicatorAction({key: 'Main'}))),
    switchMap(x => operation),
    tap(x => store.dispatch(removeBusyIndicatorAction({key: 'Main'}))),
    catchError(x => {
      store.dispatch(removeBusyIndicatorAction({key: 'Main'}));
      throw x;
    })
  );
}

Observable.prototype.executeWithMainBusy = function(x) {
  return executeWithMainBusy(this, x);
};
