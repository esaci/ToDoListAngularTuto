import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListTacheComponent } from './list-tache/list-tache.component';
import { TacheService } from './list-tache/tache.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
  declarations: [
    AppComponent,
    ListTacheComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    TacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
