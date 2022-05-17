import { Component, OnInit } from '@angular/core';
import { Project } from './interfaces/project';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  constructor() {
    
  }

  ngOnInit(): void {}
}
