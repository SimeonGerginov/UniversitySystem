import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Course } from '../../shared/models/course.model';

const PAGE_SIZE = 3;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-all-required-courses',
  templateUrl: './all-required-courses.component.html',
  styleUrls: ['./all-required-courses.component.css']
})
export class AllRequiredCoursesComponent implements OnInit {
  public courses: Course[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor(private notificationService: NotificationService,
              private moderatorService: ModeratorService) { }

  ngOnInit() {
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;
    this.moderatorService.getAllRequiredCourses()
        .map((r) => r.json())
        .subscribe((responseCourses) => {
          console.log(responseCourses);
          this.courses = responseCourses;
          this.notificationService.showInfo('Required Courses have been delivered.');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

}
