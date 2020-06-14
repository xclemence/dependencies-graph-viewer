import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
    HttpClientModule
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: HttpErrorInterceptor,
     multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
