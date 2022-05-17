import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Report } from '../interfaces/report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  };

  constructor(private http: HttpClient) {
    this.setHeader();
  }

  setHeader() {
    const token = localStorage.getItem('token');
    this.httpOptions.headers.Authorization = `Bearer ${token}`;
  }

  createReport(report: Report) {
    return this.http
      .post(`${environment.BACKEND_URI}/reports`, report, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }

  findProjectReports(id: string | null) {
    return this.http
      .get<Report>(
        `${environment.BACKEND_URI}/projects/${id}/reports`,
        this.httpOptions
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }

  findMyReports() {
    return this.http
      .get<Report>(
        `${environment.BACKEND_URI}/reports/my-reports`,
        this.httpOptions
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }
}
