import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(login: String, password: String, birthYear: number) {
    return this.http.post('http://ponyracer.ninja-squad.com/api/users',
    { 'login': login,  'password': password, 'birthYear': birthYear});
  }
}
