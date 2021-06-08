import { Injectable } from '@angular/core';
import { empty } from '@app/core/store/actions/empty.actions';
import { SoftwareService } from '@app/software/services/software.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as SoftwareActions from '../actions';

@Injectable()
export class SoftwareNameEffects {

  constructor(
    private readonly actions: Actions,
    private readonly softwareService: SoftwareService) { }

  loadSoftwareNames = createEffect(() => {
    return this.actions.pipe(
      ofType(SoftwareActions.loadSoftwareNames),
      switchMap(action => this.softwareService.names().pipe(
        map(data => SoftwareActions.loadSoftwareNamesSuccess({ data, origin: action })),
        catchError(() => of(empty({ origin: action }))),
      )),
    );
  });
}
