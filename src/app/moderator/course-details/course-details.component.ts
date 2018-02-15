import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentService } from '../../shared/services/student.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Course } from '../../shared/models/course.model';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { ModeratorService } from '../../shared/services/moderator.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  public courseId: string;

  public course: Course;
  public isUserLogged: boolean;
  public comment: Comment;

  constructor(private studentService: StudentService,
              private moderatorService: ModeratorService,
              private notificationService: NotificationService,
              private userStorage: UserStorageService,
              private router: Router,
              private route: ActivatedRoute) {
        this.subscriptions = [];
  }

  ngOnInit() {
    this.isUserLogged = this.userStorage.isUserLoggedIn();
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    const sub = this.moderatorService.getCourse(this.courseId)
          .map((r) => r.json())
          .subscribe((res) => {
            const { courseToReturn } = res;
            this.course = courseToReturn;
            console.log(this.course);
            this.notificationService.showSuccess('Course delivered.');
          }, (err) => {
            this.notificationService.showError(err);
          });

    this.subscriptions.push(sub);
  }

  onAddComment(): void {
    const sub = this.studentService.addCommentToCourse(this.course.id, this.comment)
          .map((r) => r.json())
          .subscribe((res) => {
            const { message, comment } = res;

            this.comment = comment;
            this.notificationService.showSuccess(message);
            this.router.navigateByUrl('/courses/comments');
          }, (err) => {
            this.notificationService.showError(err);
          });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
