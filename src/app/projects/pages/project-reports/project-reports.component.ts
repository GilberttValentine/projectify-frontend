import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Report } from '../../interfaces/report';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.css'],
})
export class ProjectReportsComponent implements OnInit {

  @Input() reports: any;
  @Input() projectName: any;

  constructor() {}

  ngOnInit(): void {}

  hoursDedicated(dedication: any) {
    const { hours, minutes } = dedication;

    let hoursDedicated = `${hours} hours and `;

    if (minutes <= 9) {
      hoursDedicated += `0${minutes} `;
    } else {
      hoursDedicated += `0${minutes} `;
    }

    hoursDedicated += 'minutes';

    return hoursDedicated;
  }

  transformDate(dateToTransform: Date | undefined) {
    const date = DateTime.fromISO(`${dateToTransform}`);
    const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

    return humanReadable;
  }
}
