import { PonyModel } from './../models/pony.model';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from './../models/race.model';
import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  betFailed = false;

  constructor(private activatedRoute: ActivatedRoute, private raceService: RaceService) { }

  ngOnInit() {
    const raceId = Number(this.activatedRoute.snapshot.paramMap.get('raceId'));
    if (!isNaN(raceId)) {
      this.raceService.get(raceId).subscribe(race => this.raceModel = race);
    }
  }

  betOnPony(pony: PonyModel) {
    this.raceService.bet(this.raceModel.id, pony.id).subscribe(race => this.raceModel = race, () => this.betFailed = true);
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel.betPonyId;
  }

}
