(function (window) {

  window.__env = {
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

}(this));
