import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css'],
  animations: [
    trigger('changeColor', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('hover', style({
        transform: 'scale(1.1)'
      })),
      transition('normal <=> hover', animate('0.5s'))
    ])
  ]
})
export class TacheComponent {
  @Input() tache: any;
  @Output() statusChange = new EventEmitter<boolean>();
  currentState = 'normal';

  onMouseEnter() {
    this.currentState = 'hover';
  }

  onMouseLeave() {
    this.currentState = 'normal';
  }
  onChangeStatus(status: boolean) {
    this.statusChange.emit(status);
  }
}
