import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { TacheService } from './list-tache/tache.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toDoList';
  socketMessage: any = "No message yet";
  socket: WebSocketSubject<unknown> | undefined;
  nom: string = "";
  constructor(private service: TacheService) { }

  ngOnInit() {
    this.socket = this.service.getSocket();
    this.socket.subscribe(
      (msg: any) => {
        console.log(msg);
        this.socketMessage = msg.message;
      },
      // err => console.log(err),
      // () => console.log('complete')
    );
    // this.socket.complete();
    // this.socket.error({ code: 4000, raison: 'Error !!!!' });
    this.service.recupNom().subscribe((nom: any) => {
      this.nom = nom;
    }
    );
  }
}
