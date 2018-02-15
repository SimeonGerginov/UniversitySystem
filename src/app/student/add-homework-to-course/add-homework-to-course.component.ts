import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FileUploaderService } from '../../shared/services/file-uploader.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Homework } from '../../shared/models/homework.model';
import { StudentService } from '../../shared/services/student.service';
import { UserStorageService } from '../../shared/services/user-storage.service';

const DEFAULT_SERVER_PATH = 'http://localhost:3000';

@Component({
  selector: 'app-add-homework-to-course',
  templateUrl: './add-homework-to-course.component.html',
  styleUrls: ['./add-homework-to-course.component.css']
})
export class AddHomeworkToCourseComponent implements OnInit {
  private studentUsername: string;
  private courseId: string;

  public homework: Homework;

  constructor(private fileUploader: FileUploaderService,
              private notificationService: NotificationService,
              private studentService: StudentService,
              private userStorageService: UserStorageService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.homework = new Homework();
    this.studentUsername = this.userStorageService.getLoggedUserUsername();
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  onSubmit(): void {
    this.studentService.addHomeworkToCourse(this.courseId, this.studentUsername, this.homework)
        .map((r) => r.json())
        .subscribe((res) => {
          const { message } = res;
          this.notificationService.showInfo(message);
          this.router.navigateByUrl('/home');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

  onChange(files: File[]): void {
    this.fileUploader.uploadFile(files)
       .map((r) => r.json())
       .subscribe((response: any) => {
         const { filesUrls } = response;
         this.homework.fileUrl =  DEFAULT_SERVER_PATH + filesUrls[0];
         this.notificationService.showInfo('Click on save changes in order to save your work.');
       }, (err) => {
         this.notificationService.showError(err);
       });
  }
}
