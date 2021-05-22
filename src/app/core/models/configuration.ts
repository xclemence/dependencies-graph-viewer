export interface Configuration {
  assemblyGraphqlUri: string;
  security: SecurityConfiguration;
}

export interface SecurityConfiguration {
  enabled: boolean;
  server: string;
  realm: string;
  clientId: string;
  rightMapping: { server: string; app: string; }[];
}
