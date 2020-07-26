import { Injectable } from '@angular/core';
import { operationFailure } from '@app/core/store/actions/error.actions';
import { SoftwareService } from '@app/software/services/software.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareState } from '../models';
import { operationCanceled } from './../../../core/store/actions/cancel.actions';
import { softwareAssembliesStateSelector } from './../software.selectors';

@Injectable()
export class SoftwareAssembliesEffects {

  constructor(private store: Store<SoftwareState>, private actions: Actions, private softwareService: SoftwareService) { }

  loadSoftwareAssemblies = createEffect(() => {
    return this.actions.pipe(
      ofType(loadSoftwareAssemblies),
      withLatestFrom(this.store.select(softwareAssembliesStateSelector)),
      switchMap(([action, state]) => iif(
        () => action.assemblyName.id === state?.software?.id,
        of(operationCanceled({ origin: action })),
        this.softwareService.software(action.assemblyName).pipe(
          map(data => loadSoftwareAssembliesSuccess({ data, origin: action })),
          catchError(error => of(operationFailure({ error: error.message, origin: action })))
        )),
      )
    );
  });
}
