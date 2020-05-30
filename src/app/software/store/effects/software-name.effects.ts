import { SoftwareService } from '@app/core/services/api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SoftwareActions from '../actions';

@Injectable()
export class SoftwareNameEffects {

  loadSoftwareNames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SoftwareActions.loadSoftwareNames),
      switchMap(action => this.softwareService.names().pipe(
        map(data => SoftwareActions.loadSoftwareNamesSuccess({ data, origin: action })),
        catchError(error => of(SoftwareActions.loadSoftwareNamesFailure({ error, origin: action })))
      )),
    )
  });

  constructor(private actions$: Actions, private softwareService: SoftwareService) {}
}
