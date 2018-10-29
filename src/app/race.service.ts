import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor() { }

  list() {
    return [{ name: 'Lyon' }, { name: 'London' }];
  }
}
