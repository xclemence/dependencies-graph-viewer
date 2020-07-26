import '@app/core/extensions/observable-busy';

import { fakeAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { addBusyIndicatorAction, removeBusyIndicatorAction } from '../store/actions';
import { CoreState } from '../store/models';

describe('executeWithMainBusy', () => {

  it('execute from observable', fakeAsync(() => {

    const storeSpy = jasmine.createSpyObj<Store<CoreState>>('store', ['dispatch']);

    const observable = of(2).pipe(tap(x => {
      const expectedAction = addBusyIndicatorAction({ key: 'Main' });
      expect(storeSpy.dispatch).toHaveBeenCalledWith(expectedAction);
    }));

    observable.executeWithMainBusy(storeSpy).subscribe({
      next: x => {
        const expectedAction = removeBusyIndicatorAction({ key: 'Main' });
        expect(storeSpy.dispatch).toHaveBeenCalledWith(expectedAction);
        expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);
      }
    });
  }));

  it('execute from observable with error', fakeAsync(() => {

    const storeSpy = jasmine.createSpyObj<Store<CoreState>>('store', ['dispatch']);

    const observable = of(2).pipe(map(x => { throw new Error('one error'); }));

    observable.executeWithMainBusy(storeSpy).subscribe({
      error: x => {
        const expectedAction = removeBusyIndicatorAction({ key: 'Main' });
        expect(storeSpy.dispatch).toHaveBeenCalledWith(expectedAction);
        expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);
      }
    });
  }));
});
