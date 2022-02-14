import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private login_servise: LoginService,
    private ts: TranslationService,
    private router: Router
  ) {
    this.form = this.fb.group({}); //without this typescript shows error
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  gredirectToRegistration(){
    this.router.navigate(['/registration'])
  }

  checkForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {      
      return;
    } else {
      this.login();
    }
  }
  
  $t(text: string){
    return this.ts.$t(text);
  }

  private login() {
    this.login_servise.login(this.password?.value, this.email?.value);
  }
}
