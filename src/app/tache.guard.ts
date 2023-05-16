import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Mettez ici a false pour interdir l'accès à la page de détail d'une tâche
    const isAuthorise = true;
    if (!isAuthorise) {
      alert('Vous n\'êtes pas autorisé à accéder à cette page');
      this.router.navigate(['/']); // Redirige vers la route que vous souhaitez
    }
    return isAuthorise;
  }

}
