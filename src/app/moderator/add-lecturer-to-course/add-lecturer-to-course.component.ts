import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Lecturer } from '../../shared/models/lecturer.model';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-add-lecturer-to-course',
  templateUrl: './add-lecturer-to-course.component.html',
  styleUrls: ['./add-lecturer-to-course.component.css']
})
export class AddLecturerToCourseComponent implements OnInit {
  public lecturers: Lecturer[];
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
    this.moderatorService.getAllLecturers()
        .map((r) => r.json())
        .subscribe((responseLecturers) => {
          this.lecturers = responseLecturers;
          this.notificationService.showInfo('Lecturers have been delivered.');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

  onAddLecturer(lecturerId: string) {
    this.moderatorService.addLecturerToCourse(this.courseId, lecturerId)
        .map((r) => r.json())
        .subscribe((res) => {
          const { message } = res;
          this.notificationService.showInfo(message);
          this.router.navigateByUrl('/moderator/courses/required');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

}
