const placeHolder = '[Placeholder]';

export const environment = {
  production: true,
  assemblyGraphqlUri: placeHolder,
  security: {
    enabled: false,
    server: placeHolder,
    realm: placeHolder,
    clientId: placeHolder,
    rightMapping: [] as { server: string; app: string; }[]
  },
  modules: [],
};
