export interface CurrentUserState {
  name: string;
  rights: string[];
}

export interface FeatureRightsState {
  name: string;
  rights: string[];
}

export interface SecurityState {
  currentUser?: CurrentUserState;
  featuresConfiguration: FeatureRightsState[];
  noRightPath: string;
}
