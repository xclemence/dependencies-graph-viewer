import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppSecurityModule } from './app-security.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { ConfigurationService } from './core/services/configuration.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { Store } from '@ngrx/store';
import { setCurrentUserAction } from './core/store/actions';
import { RightMappingService } from './security/services/right-mapping.service';

export function configurationInit(
  config: ConfigurationService,
  keycloak: KeycloakService,
  store: Store,
  rigthsMapping: RightMappingService
  ) {
  return async () => {

    config.load(environment.production);

    await keycloak.init({
      config: {
        url: 'http://localhost:9080/auth',
        realm: 'dependencies',
        clientId: 'graph',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        enableLogging: true,
      },
      loadUserProfileAtStartUp: true
    });

    if (await keycloak.isLoggedIn()) {
      console.log(`rights: ${keycloak.getUserRoles()}`);
      console.log(`rights udpate: ${keycloak.getUserRoles().map(x => rigthsMapping.getApplicationRight(x))}`);
      store.dispatch(setCurrentUserAction({
        name: keycloak.getUsername(),
        rigths: keycloak.getUserRoles().map(x => rigthsMapping.getApplicationRight(x))
      }));
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AppSecurityModule,
    AppStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    HttpClientModule,
    KeycloakAngularModule,
    ...environment.modules,
    // AuthConfigModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configurationInit,
      multi: true,
      deps: [ConfigurationService, KeycloakService, Store, RightMappingService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
