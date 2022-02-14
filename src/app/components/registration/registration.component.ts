import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { sameAs } from 'src/app/shared/same-as-validator.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

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

  constructor(
    private rouiter: Router,
    private fb: FormBuilder,
    private ts: TranslationService
  ) {
    this.form = this.fb.group({}); //without this typescript shows error
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(this.name_min_length)]],
      last_name: ['', [Validators.required, Validators.minLength(this.name_min_length)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.password_min_length)]],
      confirm_password: ['', [Validators.required, this.sameAsPassword.bind(this)]],
    });

    console.log(this.form);
  }

  gredirectToLogin() {
    this.rouiter.navigate(['/login']);
  }

  checkForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {      
      return;
    } else {
      // this.login();
    }
  }

  sameAsPassword() {    
    let pass = this.form.get('password')?.value;
    let c_pass = this.form.get('confirm_password')?.value;
    return sameAs(pass, c_pass);
  }

  $t(text: string){
    return this.ts.$t(text);
  }
}
