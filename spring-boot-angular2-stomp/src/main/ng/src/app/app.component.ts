import {Component} from '@angular/core';
import {StompService} from 'ng2-stomp-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  connected = false;
  greetings = new Array<string>();
  produto : Produto[] = [];
  subscription: Subscription = null;

  constructor(private stomp: StompService) {
    stomp.configure({host: 'http://localhost:8080/stomp-websocket',debug:true,
    queue:{'init':false}});
  }

  connect() {
    this.stomp.startConnect().then(() => {
      this.connected = true;
      console.log('connected');

      // there appears to be a bug in stomp-service which means the promise is
      // resolved before the connection state is properly changed
      setTimeout(() => {
        console.log('subscribing');
        this.subscription =
          this.stomp.subscribe('/topic/greetings',
            (data) => this.greetings.push(data)
          );
      }, 500);
    });
  }

  disconnect() {
    this.subscription.unsubscribe();
    this.stomp.disconnect().then(() => {
      console.log('disconnected');
      this.connected = false
    });
  }

  sendName() {
    console.log(JSON.stringify(this.produto));
    
    this.stomp.send('/app/hello', JSON.stringify(this.produto));
        //this.stomp.send('/app/hello', {"nome":"Produto1","descricao":"P1","ativo":true,"cadastro":1425610800000,"quantidade":100});

  }
}


export interface Produto {

  nome: string, descricao: string, ativo: boolean, cadastro: number, quantidade: number;


}
