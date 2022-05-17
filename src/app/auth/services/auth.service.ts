import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../interfaces/request/login';
import { UserRequest } from '../interfaces/request/user';
import { VerifyTokenRequest } from '../interfaces/request/verify-token';
import { LoginResponse } from '../interfaces/response/login';
import { PayloadResponse } from '../interfaces/response/payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(request: UserRequest) {
    return this.http.post(`${environment.BACKEND_URI}/users`, request).pipe(
      catchError((err: HttpErrorResponse) => {
        const { status, message } = err.error;

        throw { status, message };
      })
    );
  }

  login(request: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${environment.BACKEND_URI}/security/login`, request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }

  getPayloadToken(request: VerifyTokenRequest) {
    return this.http
      .post<PayloadResponse>(
        `${environment.BACKEND_URI}/security/verify-token`,
        request
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }

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
