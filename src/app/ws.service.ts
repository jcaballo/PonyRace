import { environment } from './../environments/environment.prod';
import { Injectable, Inject, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { Client, Subscription } from 'webstomp-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(@Inject(WEBSOCKET) private WebSocket: Type<WebSocket>, @Inject(WEBSTOMP) private Webstomp: any) {}

  connect<T>(channel: string): Observable<T> {
    return Observable.create((observer: any) => {
      const connection: WebSocket = new this.WebSocket(`${environment.wsBaseUrl}/ws`);
      const stompClient: Client = this.Webstomp.over(connection);
      let subscription: Subscription;
      stompClient.connect({ login: null, passcode: null }, () => {
        subscription = stompClient.subscribe(channel, message => {
          const bodyAsJson = JSON.parse(message.body);
          observer.next(bodyAsJson);
        });          // TODO emit the message received, after extracting the JSON from the body
      }, error => {
        // propagate the error
        observer.error(error);
      });
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}
