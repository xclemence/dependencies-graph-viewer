import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';

import { CoreModule } from '@app/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserManagementModule } from './user-management/user-management.module';


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
    UserManagementModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
