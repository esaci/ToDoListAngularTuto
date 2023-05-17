import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestEtatService {

  constructor() { }

  private etatRequete = new BehaviorSubject<string>('finished');
  public etatRequete$ = this.etatRequete.asObservable();

  setPending() {
      this.etatRequete.next('En cours');
  }

  setFinished() {
      this.etatRequete.next('Fin');
  }
}
