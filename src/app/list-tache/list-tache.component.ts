import { Component, NgZone } from '@angular/core';
import { Info, TacheService } from './tache.service';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css']
})
export class ListTacheComponent {
  progress: number = 0;
  intervalId: any;
  taches: any[] = [];
  tache1: string = 'Faire les courses';
  info: Info = { notification: null, progress: 0 };

  constructor(private tacheService: TacheService, private zone: NgZone) { }

  addTache() {
    this.tacheService.addTache(this.info);
  }

  ngOnInit() {
    this.tacheService.getList().subscribe(taches => {
      this.taches.push(taches);
    });
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
