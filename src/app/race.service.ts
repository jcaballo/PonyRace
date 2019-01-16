import { WsService } from './ws.service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RaceModel, LiveRaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient, private wsService: WsService) {}

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
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(p => p.status !== 'FINISHED'),
      map(p => p.ponies)
    );
  }

  boost(raceId: number, ponyId: number): Observable<RaceModel> {
    const body = { ponyId };
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/boosts`, body);
  }
}
