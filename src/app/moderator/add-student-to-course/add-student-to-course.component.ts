import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { Student } from '../../shared/models/student.model';
import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.css']
})
export class AddStudentToCourseComponent implements OnInit {
  public students: Student[];
  private courseId: string;

  public pageSize: number;
  public currentPageNumber: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private moderatorService: ModeratorService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;
    this.moderatorService.getAllStudents()
        .map((r) => r.json())
        .subscribe((responseStudents) => {
          this.students = responseStudents;
          this.notificationService.showInfo('Students have been delivered.');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

  onAddStudent(studentId: string) {
    this.moderatorService.addStudentToCourse(this.courseId, studentId)
        .map((r) => r.json())
        .subscribe((res) => {
          const { message } = res;
          this.notificationService.showInfo(message);
          this.router.navigateByUrl('/moderator/students/all');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

}
