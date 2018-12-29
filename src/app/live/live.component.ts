import { ActivatedRoute } from '@angular/router';
import { RaceService } from './../race.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel = {};
  poniesWithPosition: Array<PonyWithPositionModel>;
  raceSubscription: Subscription;
  positionSubscription: Subscription;

  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const raceId = Number(this.activatedRoute.snapshot.paramMap.get('raceId'));
    if (!isNaN(raceId)) {
      this.raceSubscription = this.raceService.get(raceId).subscribe(race => this.raceModel = race);
      this.positionSubscription = this.raceService.live(raceId).subscribe(ponies => this.poniesWithPosition = ponies);
    }
  }

  ngOnDestroy() {
    if (this.raceSubscription) {
      this.raceSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
