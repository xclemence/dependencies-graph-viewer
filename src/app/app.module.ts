import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppSecurityModule } from './app-security.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { ConfigurationService } from './core/services/configuration.service';
import { KeycloakAngularModule } from 'keycloak-angular';
import { SecurityConfigurationService } from './security/services/security-configuration.service';
import { TokenInterceptor } from './security/interceptors/token.interceptor';

export function configurationInit(
  config: ConfigurationService,
  securityConfig: SecurityConfigurationService,
  ): () => Promise<void> {
  return async () => {
    await securityConfig.configure(window.location.origin + '/silent-check-sso.html');
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor,  multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: configurationInit,
      multi: true,
      deps: [ConfigurationService, SecurityConfigurationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
