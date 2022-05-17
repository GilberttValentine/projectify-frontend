import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../interfaces/project';
import { Report } from '../../interfaces/report';
import { ProjectService } from '../../services/project.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  notFound = false;
  searching = false;

  project!: Project;
  projectId = '';

  reports: any = [];
  notFoundReports = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private reportService: ReportService
  ) {
    this.getProject();
  }

  ngOnInit(): void {}

  private getProject() {
    const projectId = this.route.snapshot.paramMap.get('id');

    this.projectId = projectId ? projectId : '';

    this.projectService.findProjectById(projectId).subscribe({
      next: (response: Project) => {
        this.project = response;

        setTimeout(() => {
          this.getReports();
        }, 500);
      },
      error: () => {
        this.notFound = true;
      },
    });
  }

  private getReports() {
    this.reportService.findProjectReports(this.projectId).subscribe({
      next: (response: Report) => {
        this.reports = response;

        setTimeout(() => {
          this.searching = true;
        }, 1000);
      },
      error: () => {
        setTimeout(() => {
          this.searching = true;
          this.notFoundReports = true;
        }, 1000);
      },
    });
  }
}
