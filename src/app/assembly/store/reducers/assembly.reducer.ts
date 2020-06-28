import { createReducer, on } from '@ngrx/store';

import * as AssembliesAction from '../actions/assemblies.actions';
import * as AssemblyDepth from '../actions/assembly-depth.actions';
import { AssemblyState } from '../models';

const initialState: AssemblyState = {
  assemblyDepth: undefined,
  assemblies: {
    filtered: [],
    count: 0
  },
};

export const assemblyReducer = createReducer(
  initialState,

  on(AssembliesAction.loadAssemblies, state => state),
  on(AssembliesAction.loadAssembliesSuccess, (state, action) => ({
    ...state,
    assemblies: {
      filtered: action.data,
      count: action.assembliesCount
    }
  })),

  on(AssemblyDepth.loadAssemblyDepth, state => state),
  on(AssemblyDepth.loadAssemblyDepthSuccess, (state, action) => ({...state, assemblyDepth: action.data }))
);
