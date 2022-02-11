import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http
      .post('/api/login', {
        username,
        password
      })
      .subscribe((data) => console.log(data));
  }
}