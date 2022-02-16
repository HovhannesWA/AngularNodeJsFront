import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { sameAs } from 'src/app/shared/same-as-validator.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { RegistrationService } from './registration.service';

export interface IReg_data {
  first_name: String;
  last_name: String;
  email: String;
  password: String;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {  
  form: FormGroup;
  first_name: AbstractControl | null = null;
  last_name: AbstractControl | null = null;
  email: AbstractControl | null = null;
  password: AbstractControl | null = null;
  confirm_password: AbstractControl | null = null;

  name_min_length: number = 4;
  password_min_length: number = 8;
  show_pass: boolean = false;
  show_pass_con: boolean = false;
  email_already_exists: boolean = false;
  submit_btn_is_disable: boolean = false;
  form_is_touched: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private ts: TranslationService,
    private reg_serv: RegistrationService,
    private loader: LoaderService
  ) {
    this.form = this.fb.group({}); //without this typescript shows error
  }

  ngOnInit(): void {    
    this.form = this.fb.group({
      first_name: [
        '',
        [Validators.required, Validators.minLength(this.name_min_length)]
      ],
      last_name: [
        '',
        [Validators.required, Validators.minLength(this.name_min_length)]
      ],
      email: [
        '',
        [Validators.required, Validators.email, this.emailExists.bind(this)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(this.password_min_length)]
      ],
      confirm_password: [
        '',
        [Validators.required, this.sameAsPassword.bind(this)]
      ],
    });
  }

  gredirectToLogin() {
    this.router.navigate(['/login']);
  }

  checkForm(button_id?: string) {
    this.form_is_touched = true;    
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    } else {
      if(button_id){
        this.loader.showButtonLoader(button_id);
      }
      let data = this.form.value;
      this.register(data);
    }
  }

  sameAsPassword() {
    let pass = this.form.get('password')?.value;
    let c_pass = this.form.get('confirm_password')?.value;
    return sameAs(pass, c_pass);
  }

  emailExists() {
    if (this.email_already_exists) {
      return { email_already_exists: true };
    } else {
      return null;
    }
  }

  $t(text: string) {
    return this.ts.$t(text);
  }

  private async register(data: IReg_data) {    
    this.reg_serv.registration(data).subscribe({
      next: () => {
        this.toast.success('Registration completed!');        
        this.loader.hideButtonLoader();
        this.submit_btn_is_disable = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        },3000)
      },
      error: (err) => {
        console.log('err',err);
        this.loader.hideButtonLoader();
        if(err.error?.errors){
          this.catchErrors(err.error.errors)
        }        
      },
    });    
  }

  private catchErrors(errors: [{ param: string; msg: string }]) {
    errors.forEach((err) => {
      let server_err = {
        server_error: err.msg,
      };

      this.form.get(err.param)?.setErrors(server_err);
    });
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
  }
}
