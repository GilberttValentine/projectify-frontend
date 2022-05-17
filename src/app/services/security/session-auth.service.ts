import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { VerifyTokenRequest } from 'src/app/auth/interfaces/request/verify-token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionAuthService {
  constructor(private http: HttpClient) {}

  isLogged() {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const request: VerifyTokenRequest = {
      token,
    };

    return this.http
      .post(`${environment.BACKEND_URI}/security/verify-token`, request)
      .pipe(
        map((res) => {
          return true;
        }),
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      )
      .subscribe({
        next: () => {
          return true;
        },
        error: () => {
          localStorage.removeItem('token');

          return false;
        },
      });
  }
}
