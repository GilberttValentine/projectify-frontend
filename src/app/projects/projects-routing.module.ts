import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { NewReportComponent } from './pages/new-report/new-report.component';
import { ProjectReportsComponent } from './pages/project-reports/project-reports.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: 'new-project',
            component: NewProjectComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: ProjectComponent,
              },
              {
                path: 'reports',
                component: NewReportComponent,
              },
            ],
          },
        ],
      },
      { path: '**', redirectTo: 'projects' },
    ],
    component: ProjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
