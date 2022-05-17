import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project';
import { Report } from '../interfaces/report';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
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

  findAllProjects() {
    return this.http.get<Project>(
      `${environment.BACKEND_URI}/projects`,
      this.httpOptions
    );
  }

  createProject(project: Project) {
    return this.http
      .post(`${environment.BACKEND_URI}/projects`, project, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }

  findProjectById(id: string | null) {
    return this.http
      .get<Project>(`${environment.BACKEND_URI}/projects/${id}`, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const { status, message } = err.error;

          throw { status, message };
        })
      );
  }

  findProjectReports(id: string | null) {
    return this.http
    .get<Report>(`${environment.BACKEND_URI}/projects/${id}/reports`, this.httpOptions)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        const { status, message } = err.error;

        throw { status, message };
      })
    );
  }
}
