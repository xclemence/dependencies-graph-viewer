import { Injectable } from '@angular/core';
import { SoftwareService } from '@app/software/services/software.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as SoftwareActions from '../actions';

@Injectable()
export class SoftwareNameEffects {

  constructor(private actions: Actions, private softwareService: SoftwareService) {}

  loadSoftwareNames = createEffect(() => {
    return this.actions.pipe(
      ofType(SoftwareActions.loadSoftwareNames),
      switchMap(action => this.softwareService.names().pipe(
        map(data => SoftwareActions.loadSoftwareNamesSuccess({ data, origin: action })),
        catchError(error => of(SoftwareActions.loadSoftwareNamesFailure({ error, origin: action })))
      )),
    );
  });
}
