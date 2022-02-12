import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslationService } from 'src/app/shared/services/translation.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  password: AbstractControl | null = null;
  username: AbstractControl | null = null;
  errors = {
    pass: '',
    username: '',
  };
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private login_servise: LoginService,
    private ts: TranslationService
  ) {
    this.form = this.fb.group({}); //without this typescript shows error
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  checkForm() {
    this.password = this.form.get('password');
    this.username = this.form.get('username');

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.setErrors();
      return;
    } else {
      this.login();
    }
  }

  resetErrors(key: 'pass' | 'username') {
    this.errors[key] = '';
  }

  private login() {
    this.login_servise.login(this.password?.value, this.username?.value);
  }

  private setErrors() {
    for (let key in this.password?.errors) {
      this.errors.pass = this.ts.$t('password_error_' + key);
    }
    for (let key in this.username?.errors) {
      this.errors.username = this.ts.$t('username_error_' + key);
    }
  }
}
