import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Input() isBoosted: boolean;
  @Output() ponyClicked = new EventEmitter<PonyModel>();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl() {
    let asset: string;
    if (this.isBoosted) {
      asset = `assets/images/pony-${this.ponyModel.color.toLowerCase()}-rainbow.gif`;
    } else if (this.isRunning) {
      asset = `assets/images/pony-${this.ponyModel.color.toLowerCase()}-running.gif`;
    } else {
      asset = `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
    }
    return asset;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }

}
