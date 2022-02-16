import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReg_data } from './registration.component';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registration(data: IReg_data) {
    return this.http.post('/api/registration', data);    
  }
}
