import { AppStoreModule } from './app-store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppSecurityModule } from './app-security.module';
import { AppComponent } from './app.component';


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
    AppStoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
