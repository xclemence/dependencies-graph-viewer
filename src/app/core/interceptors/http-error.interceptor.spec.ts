import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';

import { operationFailure } from '../store/actions';
import { CoreState } from '../store/models';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor with ErrorEvent', () => {
  let httpRequestSpy: any;
  let httpHandlerSpy: any;
  let storeSpy: any;

  beforeEach(() => {
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    storeSpy = jasmine.createSpyObj<Store<CoreState>>('store', ['dispatch']);
  });

  it('should dispatch error message from Error', () => {

    const expectedActionOnError = operationFailure({ error: 'Error (404): test-error', origin: undefined });

    httpHandlerSpy.handle.and.returnValue(throwError(
      {
        status: 404,
        message: 'test-error'
      }
    ));

    const errorInterceptor = new HttpErrorInterceptor(storeSpy);

    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          expect(err).toEqual('Error (404): test-error');
          expect(storeSpy.dispatch).toHaveBeenCalledWith(expectedActionOnError);
        }
      );

  });

  it('should dispatch error message from ErrorEvent', () => {
    const expectedErrorMessage = 'Error: test-error';
    const expectedActionOnError = operationFailure({ error: expectedErrorMessage, origin: undefined });

    const error = new ErrorEvent('Error', { message: 'test-error' });
    httpHandlerSpy.handle.and.returnValue(throwError({ error }));

    const errorInterceptor = new HttpErrorInterceptor(storeSpy);

    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          expect(err).toEqual(expectedErrorMessage);
          expect(storeSpy.dispatch).toHaveBeenCalledWith(expectedActionOnError);
        }
      );
  });

});
