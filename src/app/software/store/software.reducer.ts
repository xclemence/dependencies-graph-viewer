import { AssemblyBase, Assembly } from '@app/core/models/assembly';
import { Action, createReducer, on } from '@ngrx/store';
import * as SoftwareNameActions from './actions/software-name.actions';
import * as SoftwareAssembliesActions from './actions/software-assemblies.actions';

export const softwareFeatureKey = 'software';

export interface SoftwareState {
  softwareNames: AssemblyBase[];
  selectedAssembly: Assembly;
  loadingError: boolean;
  error: any;
}

export const initialState: SoftwareState = {
  softwareNames: [],
  selectedAssembly: undefined,
  loadingError: false,
  error: undefined
};

export const reducer = createReducer(
  initialState,

  on(SoftwareNameActions.loadSoftwareNames, state => state),
  on(SoftwareNameActions.loadSoftwareNamesSuccess, (state, action) => {
    return {...state, softwareNames: action.data, loadingError: false};
  }),
  on(SoftwareNameActions.loadSoftwareNamesFailure, (state, action) => {
    return { ...state, loadingError: false, error: action.error};
  }),

  on(SoftwareAssembliesActions.loadSoftwareAssemblies, state => state),
  on(SoftwareAssembliesActions.loadSoftwareAssembliesSuccess, (state, action) => {
    return {...state, selectedAssembly: action.data, loadingError: false};
  }),
  on(SoftwareAssembliesActions.loadSoftwareAssembliesFailure, (state, action) => {
    return { ...state, loadingError: false, error: action.error};
  })
);

