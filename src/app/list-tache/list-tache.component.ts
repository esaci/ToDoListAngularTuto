import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Info, Tache, TacheService } from './tache.service';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css'],
})
export class ListTacheComponent {
  progress: number = 0;
  intervalId: any;
  taches: any[] = [];
  info: Info = { notification: null, progress: 0 };
  filtre: boolean = false;
  derniereTache: Observable<Tache> | undefined;
  socket: WebSocketSubject<unknown> | undefined;
  
  observerList: Observer<any> = {
    next: (value: Tache) => {
      this.taches.push(value);
    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => {
      this.taches.sort((tache1: Tache, tache2: Tache) => {
        return tache1.done === tache2.done ? 0 : tache1.done ? 1 : -1;
      }
      );
    }
  }
  constructor(private tacheService: TacheService, private zone: NgZone, private router: Router, private cd: ChangeDetectorRef) { }
  getTacheId(index: number, tache: any): number {
    return tache.id; // Supposons que chaque tâche a une propriété "id" unique
  }
  setFiltre() {
    this.filtre = !this.filtre;
  }
  addTacheDone(id: string) {
    this.tacheService.addtacheDone(id);
  }
  addTache() {
    this.tacheService.addTache(this.info);
  }
  sendMessage() {
    this.tacheService.sendMessage();
  }
  redirectToDetail(id: number) {
    // Utiliser le service Router pour naviguer vers le détail de la tâche
    this.router.navigate(['/detail-tache', id], { queryParams: { infoSupp: 'valeur' } });
  }

  redirectToForm() {
    this.router.navigate(['/formulaire']);
  }

  ngOnInit() {
    this.socket = this.tacheService.getSocket();
    this.socket.subscribe(
      (msg: any) => {
        this.info.notification = msg.message;
      },
      err => console.log(err),
      () => console.log('complete')
    );
    this.derniereTache = this.tacheService.getList();
    this.derniereTache.subscribe(this.observerList);
    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.tacheService.increaseProgress(this.info);
      }, 1000);
    });
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
