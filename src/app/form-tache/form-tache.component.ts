import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TacheService } from '../list-tache/tache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-tache',
  templateUrl: './form-tache.component.html',
  styleUrls: ['./form-tache.component.css']
})
export class FormTacheComponent {
  STATUTS_POSSIBLES = ['Non démarrée', 'En cours', 'Terminée'];
  errorMessage: string = '';

  constructor(private tacheService: TacheService, private router: Router) {
  }

  verifieTitreMaj(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const titre = control.value;
      const premiereLettre = titre.charAt(0);
      if (premiereLettre !== premiereLettre.toUpperCase()) {
        return { titreMaj: { value: control.value } };
      }
      return null;
    };
  };
  tacheForm = new FormGroup({
    titre: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      this.verifieTitreMaj(),
      Validators.required
    ]),
    description: new FormControl('',
      Validators.required
    ),
    statut: new FormControl(''),
  });


  ngOnInit() { }

  onSubmit() {
    if (this.tacheForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }
    this.errorMessage = '';
    const data = {
      title: this.tacheForm.value.titre!,
      description: this.tacheForm.value.description!,
      status: this.tacheForm.value.statut!,
    };
    console.log('forme', data);
    this.tacheService.addTacheForm(data).subscribe(() => {
      this.router.navigate(['']);
    });
    console.log(this.tacheForm.value);
  }
}