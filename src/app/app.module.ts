import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListTacheComponent } from './list-tache/list-tache.component';
import { TacheService } from './list-tache/tache.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailTacheComponent } from './detail-tache/detail-tache.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TacheComponent } from './tache/tache.component';
import { TacheDisplayDirective } from './directives/tache-display.directive';
import { TacheStatusDirective } from './directives/tache-status.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListTacheComponent,
    DetailTacheComponent,
    TacheComponent,
    TacheDisplayDirective,
    TacheStatusDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [
    TacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
