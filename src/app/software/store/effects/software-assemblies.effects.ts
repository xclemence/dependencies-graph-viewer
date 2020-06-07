import { Injectable } from '@angular/core';
import { operationFailure } from '@app/core/store/actions/error.actions';
import { SoftwareService } from '@app/software/services/software.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess } from '../actions';

@Injectable()
export class SoftwareAssembliesEffects {

  constructor(private actions: Actions, private softwareService: SoftwareService) {}

  loadSoftwareAssemblies = createEffect(() => {
    return this.actions.pipe(
      ofType(loadSoftwareAssemblies),
      switchMap(action => this.softwareService.references(action.assemblyName).pipe(
        map(data => loadSoftwareAssembliesSuccess( { data, origin: action} )),
        catchError(error => of(operationFailure({ error: error.message, origin: action })))
        )),
    );
  });
}
