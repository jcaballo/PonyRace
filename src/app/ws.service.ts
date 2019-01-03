import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }

  connect<T>(channel): Observable<T> {
    return Observable.create(observer => {
      const connection: WebSocket = new WebSocket(`${environment.wsBaseUrl}/ws`);
       // TODO create the stomp client with Webstomp
      // TODO connect the stomp client
      // TODO subscribe to the specific channel and store the subscription
      // TODO handle incoming messages
      // TODO handle the unsubscription
    });
  }
}
