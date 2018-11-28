import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: any;
  authenticationFailed = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.credentials = { 'login': '', 'password': '' };
  }

  authenticate() {
    this.userService.authenticate({ 'login': this.credentials.login, 'password': this.credentials.password })
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.authenticationFailed = true
      );
  }

}
