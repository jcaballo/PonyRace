import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<any> {
    const body = { login, password, birthYear };
    return this.http.post('http://ponyracer.ninja-squad.com/api/users', body);
  }

  authenticate(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post('http://ponyracer.ninja-squad.com/api/users/authentication', credentials)
      .pipe(
        tap(user => this.storeLoggedInUser(user))
      );
  }

  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    return this.userEvents.next(user);
  }

  retrieveUser() {
    const user = window.localStorage.getItem('rememberMe');
    if (user) {
      this.userEvents.next(JSON.parse(user));
    }
  }
}
