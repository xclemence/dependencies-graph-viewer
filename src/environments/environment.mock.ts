import { MockModule } from './../app/test/mock.module';

export const environment = {
  production: true,
  assemblyGraphqlUri: '[Placeholder]',
  security: {
    enabled: false,
    rightMapping: ''
  },

  modules: [ MockModule ],
};
