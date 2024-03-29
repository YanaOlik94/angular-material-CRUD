import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './dialog/dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {LengthPipe} from './shared/pipes/length.pipe';
import {MaterialModule} from "./shared/modules/material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LengthPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
