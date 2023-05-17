import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-tache',
  templateUrl: './form-tache.component.html',
  styleUrls: ['./form-tache.component.css']
})
export class FormTacheComponent {
  STATUTS_POSSIBLES = ['Non démarrée', 'En cours', 'Terminée'];

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
      this.verifieTitreMaj()
    ]),
    description: new FormControl(''),
    statut: new FormControl(''),
  });
    // statut: new FormControl('', [this.statutValidator(this.STATUTS_POSSIBLES)]),

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    if (this.tacheForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    console.log(this.tacheForm.value);
  }
}
