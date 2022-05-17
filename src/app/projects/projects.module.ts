import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './projects.component';
import { ProjectReportsComponent } from './pages/project-reports/project-reports.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProjectService } from './services/project.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NewReportComponent } from './pages/new-report/new-report.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProjectComponent,
    ProjectsComponent,
    ProjectReportsComponent,
    NewProjectComponent,
    NavbarComponent,
    SidebarComponent,
    NewReportComponent,
  ],
  imports: [CommonModule, ProjectsRoutingModule, ReactiveFormsModule],
  providers: [ProjectService],
})
export class ProjectsModule {}
