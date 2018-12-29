import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    const body = { ponyId };
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, body);
  }

  cancelBet(raceId: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return interval(1000).pipe(
      take(101),
      map(position => [{
        id: 1,
        name: 'Superb Runner',
        color: 'BLUE',
        position
      }, {
        id: 2,
        name: 'Awesome Fridge',
        color: 'GREEN',
        position
      }, {
        id: 3,
        name: 'Great Bottle',
        color: 'ORANGE',
        position
      }, {
        id: 4,
        name: 'Little Flower',
        color: 'YELLOW',
        position
      }, {
        id: 5,
        name: 'Nice Rock',
        color: 'PURPLE',
        position
      }])
    );
  }
}
