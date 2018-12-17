import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(environment.baseUrl + '/api/races', { params });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(environment.baseUrl + '/api/races/' + raceId);
  }

  bet(raceId: number, ponyId: number) {
    const body = { ponyId };
    return this.http.post(environment.baseUrl + '/api/races/' + raceId + '/bets', body);
  }

}
