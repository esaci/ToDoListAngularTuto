import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListTacheComponent } from '../list-tache/list-tache.component';
import { DetailTacheComponent } from '../detail-tache/detail-tache.component';
import { TacheGuard } from '../tache.guard';
import { FormTacheComponent } from '../form-tache/form-tache.component';

const routes: Routes = [
  { path: '', component: ListTacheComponent, pathMatch: 'full' },
  { path: 'detail-tache/:id', component: DetailTacheComponent, canActivate: [TacheGuard] },
  { path: 'formulaire', component: FormTacheComponent }
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
