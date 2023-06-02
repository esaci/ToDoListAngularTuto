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
    console.log('Requete en cours');
    this.etatRequete.next('En cours');
  }

  setFinished() {
    console.log('Requete terminée');
    this.etatRequete.next('Fin');
  }

  setError() {
    console.log('Request error');
    this.etatRequete.next('Erreur');
  }
}
