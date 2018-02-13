import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Course } from '../../shared/models/course.model';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-all-optional-courses',
  templateUrl: './all-optional-courses.component.html',
  styleUrls: ['./all-optional-courses.component.css']
})
export class AllOptionalCoursesComponent implements OnInit {
  public courses: Course[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor(private notificationService: NotificationService,
              private moderatorService: ModeratorService) { }

  ngOnInit() {
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;
    this.moderatorService.getAllOptionalCourses()
        .map((r) => r.json())
        .subscribe((responseCourses) => {
          this.courses = responseCourses;
          this.notificationService.showInfo('Optional Courses have been delivered.');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

}
