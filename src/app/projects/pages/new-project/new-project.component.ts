import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectForm!: FormGroup;

  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get projectFormControl() {
    return this.projectForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.projectForm.valid) {
      const { name, description } = this.projectForm.value;

      const body: Project = {
        name,
        description,
      };

      this.projectService.createProject(body).subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/projects']);
          }, 1000);
        },
        error: (e) => {
          setTimeout(() => {
            this.projectFormControl.name.reset();
            this.isLoading = false;
          }, 200);
        },
      });
    } else {
      this.isLoading = false;
    }
  }
}
