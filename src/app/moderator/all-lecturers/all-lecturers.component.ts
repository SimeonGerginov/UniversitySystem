import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Lecturer } from '../../shared/models/lecturer.model';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-all-lecturers',
  templateUrl: './all-lecturers.component.html',
  styleUrls: ['./all-lecturers.component.css']
})
export class AllLecturersComponent implements OnInit {
  public lecturers: Lecturer[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor(private moderatorService: ModeratorService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;
    this.moderatorService.getAllLecturers()
        .map((r) => r.json())
        .subscribe((responseLecturers) => {
          this.lecturers = responseLecturers;
          this.notificationService.showInfo('Lecturers have been delivered.');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

}
