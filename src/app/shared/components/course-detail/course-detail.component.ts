import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

import { Course } from '../../models/course.model';
import { UserStorageService } from '../../services/user-storage.service';
import { Comment } from '../../models/comment.model';
import { StudentService } from '../../services/student.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];

  @Input()
  public course: Course;

  public isUserLogged: boolean;
  public comment: Comment;

  constructor(private userStorage: UserStorageService,
              private studentService: StudentService,
              private notificationService: NotificationService,
              private router: Router) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.isUserLogged = this.userStorage.isUserLoggedIn();
    this.comment = new Comment();
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
