import { SoftwareService } from '@app/core/services/api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as SoftwareActions from '../actions/software-assemblies.actions';

@Injectable()
export class SoftwareAssembliesEffects {

  constructor(private actions$: Actions, private softwareService: SoftwareService) {}

  loadSoftwareNames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SoftwareActions.loadSoftwareAssemblies),
      switchMap((x) => this.softwareService.references(x.assemblyName)),
      map(data => SoftwareActions.loadSoftwareAssembliesSuccess({ data })),
      catchError(error => of(SoftwareActions.loadSoftwareAssembliesFailure({ error })))
    );
  });
}
