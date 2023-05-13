import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  progress: number = 0;
  intervalId: any;
  tache1: string = 'Faire les courses';
  constructor(private zone: NgZone) { }

  increaseProgress() {
    if (this.progress === 9) {
      this.progress = 0;
      this.tache1 = 'Faire les courses !!';
    }
    else {
      if (this.progress % 2)
        this.zone.run(() => {
          this.progress += 1;
          this.tache1 = 'Faire les courses';
        });
      else {
        this.progress += 1;
        this.tache1 = 'Faire les courses';
      }
    }
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.increaseProgress();
      }, 1000);
    });
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
