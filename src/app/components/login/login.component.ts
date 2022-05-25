import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, IUser } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { TranslationService } from 'src/app/shared/services/translation.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  password: AbstractControl | null = null;
  email: AbstractControl | null = null;
  show_pass: boolean = false;
  form_is_touched: boolean = false;
  logged_in = false;
  user_sub: Subscription = null!;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ts: TranslationService,
    private login_servise: LoginService,
    private loader: LoaderService,
    private helper: HelperService,
    private auth_service: AuthService
  ) {
    this.form = this.fb.group({}); //without this typescript shows error
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.user_sub = this.auth_service.user.subscribe(user => {
      this.logged_in = !!user;
    })
  }

  ngOnDestroy(): void {
    this.user_sub.unsubscribe();
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
        next: (data: {user: IUser, refresh_token: string, access_token: string}) => {
          console.log(data);
          this.auth_service.setRefreshToken(data.refresh_token);
          this.auth_service.setAccessToken(data.access_token);
          this.updateUser(data.user);
          this.loader.hideButtonLoader();
          this.router.navigate(['/home']);
        },
        error: (err) => {               
          this.helper.catchServerErrors(err, this.form);          
          this.loader.hideButtonLoader();         
        }
      });
  }

  logout(){
    this.auth_service.logout();
  }

  updateUser(user: IUser) {
    this.auth_service.updateUser(user);
  }
}
