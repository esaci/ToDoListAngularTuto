import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, concatMap, delay, distinctUntilChanged, map, of, tap } from 'rxjs';

export interface Info {
  notification: string | null,
  progress: number
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  progress: number = 0;
  intervalId: any;
  notification: string | null = null;

  constructor(private zone: NgZone, private http: HttpClient) { }

  getList() {
    return this.http.get('http://185.209.223.19:8100/getList').pipe(
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
    );
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
    return this.http.post('http://185.209.223.19:8100/add', tache, { observe: 'response' }).pipe(
      tap(() => info.notification = "La tâche est en cours d'ajout."),
      delay(5000),
      tap(() => info.notification = null),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    ).subscribe(observerPost);
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