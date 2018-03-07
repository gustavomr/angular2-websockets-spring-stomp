import { Component } from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ws;
  mensagem;
  mensagens: any[] = [];

  constructor() {

    
    
    this.ws = new $WebSocket('ws://localhost:8080/name');

    

    console.log('conectou');
    this.ws.onMessage(
      (msg: MessageEvent)=> {
          console.log("onMessage ", msg.data);
          this.mensagens.push(msg.data);
      },
      {autoApply: false}
    );

   
    // set received message stream
// this.ws.getDataStream().subscribe(
//   (msg)=> {
//       console.log("next", msg.data);
//       this.mensagens.push(msg.data);

//       this.ws.close(false);
//   },
//   (msg)=> {
//       console.log("error", msg);
//   },
//   ()=> {
//       console.log("complete");
//   }
// );
    

  }

  enviar() {
    var data = JSON.stringify({'name': this.mensagem})

    this.ws.send(data).subscribe(
     
      (msg)=> {
          console.log("next", msg.data);
          
      },
      (msg)=> {
          console.log("error", msg);
      },
      ()=> {
          console.log("complete");
      }
  );
  }

  desconectar() {
    if (this.ws != null) {
      console.log("fechou");
      this.ws.close(true);
    }
  }

  



}
