import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer, catchError, concatMap, delay, distinctUntilChanged, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toDoList';
  constructor() { }
}
