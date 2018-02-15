import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';

const EMAIL_PATTERN = '^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$';
const PASSWORD_PATTERN = '^[a-zA-Z0-9 ]{8,30}$';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public studentForm: FormGroup;

  constructor(private router: Router,
              private moderatorService: ModeratorService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
     this.studentForm = new FormGroup({
       username: new FormControl('', [ Validators.required,
                                 Validators.minLength(3),
                                 Validators.maxLength(30)]),
       firstName: new FormControl('', [ Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(18)]),
       lastName: new FormControl('', [ Validators.required,
                                 Validators.minLength(3),
                                 Validators.maxLength(18)]),
       email: new FormControl('', [ Validators.required, Validators.pattern(EMAIL_PATTERN)]),
       password: new FormControl('', [ Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
       specialty: new FormControl('', [ Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(15)]),
      currentCourseInUniversity: new FormControl('', [ Validators.required,
                                                 Validators.min(1), Validators.maxLength(4)])
    });
  }

  onStudentCreationSubmit(): void {
    const studentFromForm = Object.assign({}, this.studentForm.value);

    this.moderatorService.createStudent(studentFromForm)
        .map((r) => r.json())
        .subscribe((responseObject) => {
          const { message } = responseObject;

          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/moderator/students/all');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }
}
