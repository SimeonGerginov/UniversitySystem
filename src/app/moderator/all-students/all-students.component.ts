import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Student } from '../../shared/models/student.model';

const PAGE_SIZE = 3;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  public students: Student[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor(private moderatorService: ModeratorService,
              private notificationService: NotificationService) { }

  ngOnInit() {
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

}
