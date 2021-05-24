(function (window) {

  window.__env = {
    assemblyGraphqlUri: "${DEPENDENCIES_GRAPHQL_URI}",
    security: {
      enabled: ${SECURITY_ENABLED},
      server: "${SECURITY_SERVER}",
      realm: "${SECURITY_REALM}",
      clientId: "${SECURITY_CLIENT_ID}",
      rightMapping: [
        ${SECURITY_RIGHT_MAPPING}
      ]
    }
  };

}(this));
