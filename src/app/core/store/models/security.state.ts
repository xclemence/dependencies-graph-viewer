export interface CurrentUserState {
  name: string;
  rights: string[];
}

export interface FeatureRigthsState {
  name: string;
  rights: string[];
}

export interface SecurityState {
  currentUser: CurrentUserState;
  featuresConfiguration: FeatureRigthsState[];
}
