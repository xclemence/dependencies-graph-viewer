import { Injectable } from '@angular/core';
import { AssemblyService } from '@app/assembly/services/assembly.service';
import { empty } from '@app/core/store/actions/empty.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadAssemblyDepth, loadAssemblyDepthSuccess } from '../actions';

@Injectable()
export class AssemblyDepthEffects {

  constructor(
    private readonly actions: Actions,
    private readonly assemblyService: AssemblyService) {}

  loadAssemblyDepth = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblyDepth),
      switchMap(action => this.assemblyService.references(action.assemblyId, action.depth).pipe(
        map(data => loadAssemblyDepthSuccess( { data, origin: action} )),
        catchError(() => of(empty({origin: action }))),
      )),
    );
  });
}
