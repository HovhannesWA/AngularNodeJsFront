import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  id: number;
  createdAt: string;
  email: string;
  email_confirm_token: string | null;
  email_is_confirmed: boolean;
  first_name: string;
  last_name: string;
  image_url: string | null;
  password: string;
  role: number;
  updatedAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  access_token: string | null = null;
  refresh_token: string | null = null;
  user = new BehaviorSubject<IUser | null>(null);

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.access_token = localStorage.getItem('access_token') || null;
      this.refresh_token = localStorage.getItem('refresh_token') || null;
  }

  updateUser(user: IUser){      
      let updated_data = {...this.user, ...user}
      this.user.next(updated_data);
  }

  logout(){
      this.user.next(null);
      this.access_token = null;
      this.refresh_token = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.router.navigate(['/login']);
  }

  setAccessToken(token: string){
      token = 'Bearer ' + token;
      this.access_token = token;
      localStorage.setItem('access_token', token);
  }

  setRefreshToken(token: string){
    this.refresh_token = token;
    localStorage.setItem('refresh_token', token);
}
}
