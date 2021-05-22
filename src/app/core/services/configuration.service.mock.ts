import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';

declare global {
  interface Window { __env: Configuration; }
}

@Injectable()
export class ConfigurationServiceMock {

  #configuration = {
    assemblyGraphqlUri: 'http://kmaster/graphql-service/graphql',
    security: {
      enabled: true,
      server: 'http://localhost:9080/auth',
      realm: 'dependencies',
      clientId: 'graph',
      rightMapping: [
        {server: 'dg_assembly_remove', app: 'remove-assembly' }
      ]
    },
  };

  get configuration(): Configuration {
    return this.#configuration;
  }
}
