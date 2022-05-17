import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';

import { ReportService } from './services/report.service';
import { ProjectService } from './services/project.service';

import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { NewReportComponent } from './pages/new-report/new-report.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './projects.component';
import { ProjectReportsComponent } from './pages/project-reports/project-reports.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';


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
  providers: [ProjectService, ReportService],
})
export class ProjectsModule {}
