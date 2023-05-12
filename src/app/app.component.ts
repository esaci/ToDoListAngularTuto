import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  progress: number = 0;
  intervalId: any;
  tache1: string = 'Faire les courses';

  increaseProgress() {
    if (this.progress === 9) {
      this.progress = 0;
      this.tache1 = 'Faire les courses !!';
    }
    else {
      this.progress += 1;
      this.tache1 = 'Faire les courses';
    }
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.increaseProgress();
    }, 1000);
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
