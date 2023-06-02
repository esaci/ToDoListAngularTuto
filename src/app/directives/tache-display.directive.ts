import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTacheDisplay]',
})
export class TacheDisplayDirective implements OnChanges {
  @Input('appTacheDisplay') isCompleted: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.style.color = this.isCompleted ? 'lightgreen' : 'lightcoral';
  }
}
