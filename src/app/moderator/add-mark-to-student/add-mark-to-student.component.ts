import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-add-mark-to-student',
  templateUrl: './add-mark-to-student.component.html',
  styleUrls: ['./add-mark-to-student.component.css']
})
export class AddMarkToStudentComponent implements OnInit {
  private courseId: string;
  private studentId: string;

  public markValue: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private moderatorService: ModeratorService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.studentId = this.route.snapshot.paramMap.get('studentId');
  }

  onAddMark(): void {
    this.moderatorService.addMarkToStudentForCourse(this.courseId, this.studentId, this.markValue)
        .map((r) => r.json())
        .subscribe((res) => {
          const { message } = res;
          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/moderator/courses');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }
}
