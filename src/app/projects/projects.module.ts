import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './projects.component';
import { ProjectReportsComponent } from './pages/project-reports/project-reports.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';

@NgModule({
  declarations: [HomeComponent, ProjectComponent, ProjectsComponent, ProjectReportsComponent, NewProjectComponent],
  imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
