import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
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
                component: ProjectReportsComponent,
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
