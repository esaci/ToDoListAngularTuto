import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize } from 'rxjs';
import { RequestEtatService } from './request-etat.service';

@Injectable({
  providedIn: 'root'
})
export class PrenomInterceptorService {

  constructor(private reqEtatService: RequestEtatService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqEtatService.setPending(); // set ma variable a en cours dans mon service
    const clonedRequest = req.clone({
      headers: req.headers.set('X-Prenom', 'Christopher')
    });

    return next.handle(clonedRequest).pipe(
      catchError((err) => {
        this.reqEtatService.setError(); // set ma variable a erreur dans mon service
        throw err;
      }),
      finalize(() => this.reqEtatService.setFinished(), // set ma variable a fini dans mon service
      )
    );
  }

}
