import { MockModule } from './../app/test/mock.module';

export const environment = {
  production: true,
  assemblyGraphqlUri: '[Placeholder]',
  security: {
    enabled: false,
    server: '',
    realm: '',
    clientId: '',
    rightMapping: []
  },

  modules: [ MockModule ],
};
