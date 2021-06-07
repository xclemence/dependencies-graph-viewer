import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ConfigurationService } from './services/configuration.service';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};


@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, configService: ConfigurationService) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: configService.configuration.assemblyGraphqlUri,
          }),
          defaultOptions
        }
      },
      deps: [HttpLink, ConfigurationService],
    },
  ],
})
export class GraphQLModule { }
