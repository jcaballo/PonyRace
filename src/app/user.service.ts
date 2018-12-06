import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new Subject<UserModel>();

  constructor(private http: HttpClient) {
  }

  register(login: string, password: string, birthYear: number): Observable<any> {
    const body = { login, password, birthYear };
    return this.http.post('http://ponyracer.ninja-squad.com/api/users', body);
  }

  authenticate(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post('http://ponyracer.ninja-squad.com/api/users/authentication', credentials)
      .pipe(
        tap(user => this.userEvents.next(user))
      );
  }

}
