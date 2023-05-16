import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent {
  @Input() tache: any;
  @Output() statusChange = new EventEmitter<boolean>();

  onChangeStatus(status: boolean) {
    this.statusChange.emit(status);
  }
}
