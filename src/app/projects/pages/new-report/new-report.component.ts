import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../interfaces/project';
import { Report } from '../../interfaces/report';
import { ProjectService } from '../../services/project.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css'],
})
export class NewReportComponent implements OnInit {
  reportForm!: FormGroup;

  project!: Project;
  projectId = '';
  projectFinded = false;

  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private reportService: ReportService
  ) {
    this.getProject();

    this.reportForm = this.fb.group({
      hours: ['', Validators.required],
      minutes: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  private getProject() {
    const projectId = this.route.snapshot.paramMap.get('id');

    this.projectId = projectId ? projectId : '';

    this.projectService.findProjectById(projectId).subscribe({
      next: (response: Project) => {
        this.project = response;
        this.projectFinded = true;
      },
      error: () => {
        this.router.navigate(['/projects']);
      },
    });
  }

  get reportFormControl() {
    return this.reportForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.reportForm.valid) {
      const { hours, minutes } = this.reportForm.value;

      const body: Report = {
        projectId: this.projectId,
        dedication: {
          hours,
          minutes,
        },
      };

      this.reportService.createReport(body).subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/projects']);
          }, 1000);
        },
        error: (e) => {
          this.reportFormControl.hours.reset();
          this.reportFormControl.minutes.reset();
          setTimeout(() => {
            this.isLoading = false;
          }, 200);
        },
      });
    } else {
      this.isLoading = false;
    }
  }
}
