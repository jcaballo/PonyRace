import { Component } from '@angular/core';

@Component({
  selector: 'pr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ponyrace';
  user: any = { name: 'Cédric' };
}
