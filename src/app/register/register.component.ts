import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor(fb: FormBuilder) {
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.confirmPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, { validator: RegisterComponent.passwordMatch });

    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.birthYearCtrl = fb.control('', [Validators.required]);
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

  }

}
