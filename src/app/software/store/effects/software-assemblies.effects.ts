import { SoftwareService } from '@app/core/services/api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadSoftwareAssembliesFailure, loadSoftwareAssembliesSuccess, loadSoftwareAssemblies } from '../actions';

@Injectable()
export class SoftwareAssembliesEffects {

  constructor(private actions: Actions, private softwareService: SoftwareService) {}

  loadSoftwareNames = createEffect(() => {
    return this.actions.pipe(
      ofType(loadSoftwareAssemblies),
      switchMap(action => this.softwareService.references(action.assemblyName).pipe(
        map(data => loadSoftwareAssembliesSuccess( { data: data, origin: action} )),
        catchError(error => of(loadSoftwareAssembliesFailure( { error: error, origin: action })))
      )),
    );
  });
}
