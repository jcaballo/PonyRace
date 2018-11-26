import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  registrationFailed: boolean;

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.confirmPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, { validator: RegisterComponent.passwordMatch });

    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  static passwordMatch(group: FormGroup): any {
    if (group.get('password').value !== group.get('confirmPassword').value) {
      return { matchingError: true };
    }
    return null;
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.userForm.get('login').value,
     this.userForm.get('passwordForm').get('password').value,
     this.userForm.get('birthYear').value)
    .subscribe(response => this.router.navigate(['/']), response => this.registrationFailed = true);
  }

}
