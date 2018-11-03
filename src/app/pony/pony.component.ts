import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

const IMAGES_URL = 'assets/images/';
@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Output() ponyClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    return IMAGES_URL + 'pony-' + this.ponyModel.color.toLowerCase() + '.gif';
  }

  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }

}
