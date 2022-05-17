import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  projects: any = [];

  constructor(private projectService: ProjectService) {
    this.projectService.findAllProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}

  transformDate(dateToTransform: Date) {
    const date = DateTime.fromISO(`${dateToTransform}`);
    const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

    return humanReadable;
  }
}
