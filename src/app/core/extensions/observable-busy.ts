import { BusyService } from '@app/core/services/tech/busy.service';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

declare module 'rxjs' {
  export interface Observable<T> {
    executeWithBusy(busyItem: { isBusy: boolean}): Observable<T>;
    executeWithMainBusy(service: BusyService): Observable<T>;
  }
}

function executeWithBusy<T>(operation: Observable<T>, busyItem: { isBusy: boolean}): Observable<T>  {
  return of(null).pipe(
    tap(x => busyItem.isBusy = true),
    switchMap(x => operation),
    tap(x => busyItem.isBusy = false),
    catchError(x => {
      busyItem.isBusy = false;
      throw x;
    })
  );
}

function executeWithMainBusy<T>(operation: Observable<T>, service: BusyService): Observable<T>  {
  let busyId: any;
  return of(null).pipe(
    tap(x => busyId = service.busy()),
    switchMap(x => operation),
    tap(x => service.unbusy(busyId)),
    catchError(x => {
      service.unbusy(busyId);
      throw x;
    })
  );
}

Observable.prototype.executeWithBusy = function(x) {
  return executeWithBusy(this, x);
};

Observable.prototype.executeWithMainBusy = function(x) {
  return executeWithMainBusy(this, x);
};
