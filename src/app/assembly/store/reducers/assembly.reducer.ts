import { createReducer, on } from '@ngrx/store';

import * as AssembliesAction from '../actions/assemblies.actions';
import * as AssemblyDepth from '../actions/assembly-depth.actions';
import { AssemblyState } from '../models';

const initialState: AssemblyState = {
  assemblyDepth: undefined,
  assemblies: []
};

export const assemblyReducer = createReducer(
  initialState,

  on(AssembliesAction.loadAssemblies, state => state),
  on(AssembliesAction.loadAssembliesSuccess, (state, action) => {
    return {...state, assemblies: action.data };
  }),
  on(AssembliesAction.loadAssembliesFailure, (state, action) => state),

  on(AssemblyDepth.loadAssemblyDepth, state => state),
  on(AssemblyDepth.loadAssemblyDepthSuccess, (state, action) => {
    return {...state, assemblyDepth: action.data };
  }),
  on(AssemblyDepth.loadAssemblyDepthFailure, (state, action) => state)
);
