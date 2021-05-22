import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ConfigurationService } from './services/configuration.service';

export function createApollo(httpLink: HttpLink, configService: ConfigurationService): any {
  return {
    link: httpLink.create({uri: configService.configuration.assemblyGraphqlUri}),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ConfigurationService],
    },
  ],
})
export class GraphQLModule {}
