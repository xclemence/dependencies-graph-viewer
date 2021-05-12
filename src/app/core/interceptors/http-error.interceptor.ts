import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { operationFailure } from '../store/actions';
import { CoreState } from '../store/models';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private readonly store: Store<CoreState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error?.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error (${error?.status}): ${error?.message}`;
        }

        this.store.dispatch(operationFailure({error: errorMessage, origin: undefined}));
        return throwError(errorMessage);
      })
    );
  }
}
