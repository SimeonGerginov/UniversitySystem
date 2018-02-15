import { Component, Input } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  @Input()
  public course: Course;

  constructor() {}
}
