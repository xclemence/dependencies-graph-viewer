import { NgModule } from '@angular/core';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ConfigurationService } from './services/configuration.service';

export function createApollo(configService: ConfigurationService): any {
  return new ApolloClient({
    uri: configService.configuration.assemblyGraphqlUri,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  });
}

@NgModule({
  providers: [
    {
      provide: ApolloClient,
      useFactory: createApollo,
      deps: [ConfigurationService],
    },
  ],
})
export class GraphQLModule {}
