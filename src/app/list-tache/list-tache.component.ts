import { Component, NgZone } from '@angular/core';
import { Info, TacheService } from './tache.service';
import { Router } from '@angular/router';

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
  filtre: boolean = false;

  constructor(private tacheService: TacheService, private zone: NgZone, private router: Router) { }

  setFiltre() {
    this.filtre = !this.filtre;
  }
  addTache() {
    this.tacheService.addTache(this.info);
  }

  redirectToDetail(id: number) {
    console.log('redirectToDetail:', id)
    // Utiliser le service Router pour naviguer vers le détail de la tâche
    this.router.navigate(['/detail-tache', id], { queryParams: { infoSupp: 'valeur' } });
  }

  ngOnInit() {
    console.log('ngOnInit:', this.taches)
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
