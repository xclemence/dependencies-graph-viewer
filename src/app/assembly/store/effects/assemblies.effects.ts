import { AssemblyService } from '@app/core/services/api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadAssemblies, loadAssembliesSuccess, loadAssembliesFailure } from './../actions';

@Injectable()
export class AssembliesEffects {

  loadSoftwareNames = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblies),
      switchMap(action => this.assemblyService.assemblyStatistics(1, 1).pipe(
        map(data => loadAssembliesSuccess({ data: data, origin: action })),
        catchError(error => of(loadAssembliesFailure({ error, origin: action })))
      )),
    );
  });

  constructor(private actions: Actions, private assemblyService: AssemblyService) {}
}
