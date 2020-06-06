import { Injectable } from '@angular/core';
import { SoftwareService } from '@app/software/services/software.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadSoftwareAssemblies, loadSoftwareAssembliesFailure, loadSoftwareAssembliesSuccess } from '../actions';

@Injectable()
export class SoftwareAssembliesEffects {

  constructor(private actions: Actions, private softwareService: SoftwareService) {}

  loadSoftwareAssemblies = createEffect(() => {
    return this.actions.pipe(
      ofType(loadSoftwareAssemblies),
      switchMap(action => this.softwareService.references(action.assemblyName).pipe(
        map(data => loadSoftwareAssembliesSuccess( { data, origin: action} )),
        catchError(error => of(loadSoftwareAssembliesFailure( { error, origin: action })))
      )),
    );
  });
}
