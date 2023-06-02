import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
import { FormTacheComponent } from './form-tache/form-tache.component';
import { PrenomInterceptorService } from './prenom-interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    ListTacheComponent,
    DetailTacheComponent,
    TacheComponent,
    TacheDisplayDirective,
    TacheStatusDirective,
    FormTacheComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    TacheService,
    { provide: HTTP_INTERCEPTORS, useClass: PrenomInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
