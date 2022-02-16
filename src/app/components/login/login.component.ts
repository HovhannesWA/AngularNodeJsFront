import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { TranslationService } from 'src/app/shared/services/translation.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  password: AbstractControl | null = null;
  email: AbstractControl | null = null;
  show_pass: boolean = false;
  form_is_touched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ts: TranslationService,
    private login_servise: LoginService,
    private loader: LoaderService,
    private helper: HelperService
  ) {
    this.form = this.fb.group({}); //without this typescript shows error
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  gredirectToRegistration() {
    this.router.navigate(['/registration']);
  }

  checkForm(button_id?: string) {
    this.form_is_touched = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    } else {
      if (button_id) {
        this.loader.showButtonLoader(button_id);
      }
      this.login();
    }
  }

  $t(text: string) {
    return this.ts.$t(text);
  }

  resetServerErrors(){
    this.form.controls['email'].setErrors({'server_error': null});
    this.form.controls['email'].updateValueAndValidity()
  }

  private login() {
    let pass = this.form.get('password')?.value;
    let email = this.form.get('email')?.value;    
    this.login_servise
      .login(email, pass)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.loader.hideButtonLoader();
        },
        error: (err) => {
          console.log('err', err);          
          this.helper.catchServerErrors(err, this.form);          
          this.loader.hideButtonLoader();         
        }
      });
  }
}
