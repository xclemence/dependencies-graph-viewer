import { AssemblyService } from '@app/core/services/api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadAssemblyDepth, loadAssemblyDepthSuccess, loadAssemblyDepthFailure } from '../actions';

@Injectable()
export class AssemblyDepthEffects {

  constructor(private actions: Actions, private assemblyService: AssemblyService) {}

  loadSoftwareNames = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblyDepth),
      switchMap(action => this.assemblyService.references(action.assemblyId, action.depth).pipe(
        map(data => loadAssemblyDepthSuccess( { data: data, origin: action} )),
        catchError(error => of(loadAssemblyDepthFailure( { error: error, origin: action })))
      )),
    );
  });
}
