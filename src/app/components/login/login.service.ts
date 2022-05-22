import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  

  login(email: string, password: string): Observable<any> {
    return this.http
      .post('/api/login', {
        email,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
}
