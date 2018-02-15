import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { Course } from '../../shared/models/course.model';
import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';

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

  constructor(private userService: UsersService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;
    this.userService.getAllRequiredCourses()
       .map((r) => r.json())
       .subscribe((responseCourses) => {
         const { courses } = responseCourses;
         this.courses = courses;
         this.notificationService.showInfo('All courses are delivered.');
       }, (err) => {
         this.notificationService.showError(err);
       });
  }

}
