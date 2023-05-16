import { Component } from '@angular/core';
import { Tache, TacheService } from '../list-tache/tache.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-tache',
  templateUrl: './detail-tache.component.html',
  styleUrls: ['./detail-tache.component.css']
})

export class DetailTacheComponent {
  tacheActuel: any = {
    id: 0,
    title: 'Tache non trouvée',
    description: 'Tache non trouvée',
    done: false,
    date: new Date(),
    status: 'Tache non trouvée'
  };
  constructor(private tacheService: TacheService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tacheService.getList();
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'URL
    const tache = this.tacheService.getTache(id); // Utiliser le service pour obtenir les détails de la tâche
    console.log('tache', tache, 'est un observable?', tache instanceof Observable);
    if (tache instanceof Observable) {
      tache.subscribe((taches: Tache[]) => {
        const tacheFind = taches.find(tache => tache.id === Number(id));
        if (tacheFind) this.tacheActuel = tacheFind;
      });
    }
    else if (tache) this.tacheActuel = tache; // Si la tâche existe, l'assigner à la variable tacheActuel
  }
}
