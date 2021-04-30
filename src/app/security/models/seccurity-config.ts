
export interface SecurityConfig {
  features: FeatureRightsConfig[];
}

export interface FeatureRightsConfig {
    feature: string;
    rights: string[];
}
