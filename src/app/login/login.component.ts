import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: any;

  constructor() { }

  ngOnInit() {
    this.credentials = { 'login': '', 'password': '' };
  }

  authenticate() {

  }

}
