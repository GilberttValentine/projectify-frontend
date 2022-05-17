import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css'],
})
export class MyReportsComponent implements OnInit {
  reports: any = [];

  constructor(
    private reportService: ReportService,
  ) {
    this.reportService.findMyReports().subscribe({
      next: (response) => {
        this.reports = response;
      },
      error: () => {},
    });
  }

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
