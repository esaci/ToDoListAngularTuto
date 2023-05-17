import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { RequestEtatService } from './request-etat.service';

@Injectable({
  providedIn: 'root'
})
export class PrenomInterceptorService {

  constructor(private reqEtatService: RequestEtatService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqEtatService.setPending();
    const clonedRequest = req.clone({
        headers: req.headers.set('X-Prenom', 'Elias')
    });

    return next.handle(clonedRequest).pipe(
      finalize(() => this.reqEtatService.setFinished())
    );
}

}
