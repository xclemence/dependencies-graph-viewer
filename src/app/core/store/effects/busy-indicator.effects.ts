import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { filter, map } from 'rxjs/operators';
import { addBusyIndicatorAction, removeBusyIndicatorAction } from '../actions/busy-indicator.actions';

@Injectable()
export class BusyIndicatorEffects {
  addBusyEffect = createEffect(() => {
    return this.actions.pipe(
      filter((action: any) => action && action.busyKey),
      map((action: any) =>  addBusyIndicatorAction( { key: action.busyKey }))
    );
  });

  removeBusyEffect = createEffect(() => {
    return this.actions.pipe(
      filter((action: any) => action && action.origin && action.origin.busyKey),
      map((action: any) =>  removeBusyIndicatorAction( { key: action.origin.busyKey }))
    );
  });

  constructor(private actions: Actions) {}
}
