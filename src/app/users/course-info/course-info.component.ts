import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../shared/models/course.model';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { StudentService } from '../../shared/services/student.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];

  course: Course;
  comment: string;
  isUserLogged: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userStorage: UserStorageService,
              private userService: UsersService,
              private notificationService: NotificationService,
              private studentService: StudentService) { }

  ngOnInit() {
    this.subscriptions = [];
    this.course = new Course();
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.isUserLogged = this.userStorage.isUserLoggedIn();

    const sub = this.userService.getCourse(courseId)
        .map((r) => r.json())
        .subscribe((res) => {
          this.course = res;
          this.notificationService.showInfo('Course delivered.');
        }, (err) => {
          this.notificationService.showError(err);
        });

     this.subscriptions.push(sub);
  }

  onAddComment() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const sub = this.studentService.addCommentToCourse(courseId, this.comment)
      .map((r) => r.json())
      .subscribe((responseObject: any) => {
        this.course = responseObject.course;
        this.notificationService.showSuccess('Comment has been added.');
        this.router.navigateByUrl('/home');
      }, (err) => {
        this.notificationService.showError(err);
      });

    this.subscriptions.push(sub);
}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
