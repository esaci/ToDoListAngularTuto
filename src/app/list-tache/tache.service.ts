import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, concatMap, delay, distinctUntilChanged, map, of, tap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

export interface Info {
  notification: string | null,
  progress: number
}

export interface Tache {
  id: number;
  title: string;
  description: string;
  done: boolean;
  date: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  socket: WebSocketSubject<unknown> | undefined;
  progress: number = 0;
  intervalId: any;
  notification: string | null = null;
  taches: Tache[] | undefined;
  reponsePost: string = "";

  constructor(private zone: NgZone, private http: HttpClient) {
    this.socket = webSocket('ws://185.209.223.19:8095/');
  }

  getSocket() {
    if (!this.socket)
      this.socket = webSocket('ws://185.209.223.19:8095/');
    return this.socket;
  }

  sendMessage() {
    this.socket?.next('message');
  }
  addtacheDone(id: string) {
    console.log('voici l\'id: ', id);
    this.socket?.next(`{addTacheDone: ${id}}`);
  }
  getTache(id: string | null) {
    if (this.taches) {
      return this.taches.find(tache => tache.id === Number(id));
    }
    const res = this.http.get('http://185.209.223.19:8100/getList').pipe(map((message: any) => message.data));
    res.subscribe((taches: Tache[]) => {
      this.taches = taches;
    });
    return res
  }

  getList() {
    const res = this.http.get('http://185.209.223.19:8100/getList');

    return res.pipe(
      map((message: any) => message.data),
      concatMap(taches => {
        return taches;
      }),
      distinctUntilChanged((tache1: any, tache2: any) => {
        return tache1.title === tache2.title;
      }),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );;
  }

  addTache(info: Info) {
    const tache = {
      title: 'Faire une tâche',
      description: 'Une description',
    };
    const observerPost = {
      next: (value: any) => {
        const test = JSON.parse(JSON.stringify(value));
        info.notification = test.body.message;
        setTimeout(() => {
          info.notification = null;
        }
          , 5000);
      },
      error: (error: any) => console.log('Error: ', error),
      complete: () => console.log('Complete!'),
    };
    // { message: 'Tache ajoutée', data: newTodo }
    return this.http.post('http://185.209.223.19:8100/add', tache, { observe: 'response' }).pipe(
      tap((res: any) => {
        info.notification = "La tâche est en cours d'ajout.";
        this.reponsePost = res.body.message;
        console.log('res: ', this.reponsePost);
      }),
      delay(5000),
      tap(() => info.notification = null),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    ).subscribe(observerPost);
  }

  addTacheForm(tache: { title: string, description: string }) {
    // { message: 'Tache ajoutée', data: newTodo }
    return this.http.post('http://185.209.223.19:8100/add', tache, { observe: 'response' }).pipe(
      tap((res: any) => {
        this.reponsePost = res.body.message;
      }),
      delay(5000),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  recupNom() {
    // { message: 'Tache ajoutée', data: newTodo }
    return this.http.get('http://185.209.223.19:8100/qui').pipe(tap((obj) => console.log('requete envoyee', obj)), map((message: any) => message.data));
  }

  increaseProgress(info: Info) {
    if (info.progress === 9) {
      this.zone.run(() => {
        info.progress = 0;
      });
    }
    if (info.progress % 2)
      this.zone.run(() => {
        info.progress += 1;
      });
    else
      info.progress += 1;
  }

}
