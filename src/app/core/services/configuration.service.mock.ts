import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';

declare global {
  interface Window { __env: Configuration; }
}

@Injectable()
export class ConfigurationServiceMock {

  #configuration = {
    assemblyGraphqlUri: 'https://localhost:4001/graphql',
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
