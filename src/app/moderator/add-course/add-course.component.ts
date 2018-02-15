import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public courseForm: FormGroup;

  constructor(private router: Router,
              private notificationService: NotificationService,
              private moderatorService: ModeratorService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.courseForm = new FormGroup({
      name: new FormControl('', [ Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(30)]),
      credits: new FormControl('', [ Validators.required,
                                 Validators.min(1),
                                 Validators.max(10)]),
      maxPlacesInCourse: new FormControl('', [ Validators.required,
                                Validators.max(100)]),
      availablePlacesInCourse: new FormControl('', [ Validators.required,
                                Validators.min(0), Validators.max(100)]),
      isRequired: new FormControl('', [ Validators.required])
    });
  }

  onCourseCreationSubmit(): void {
    const courseFromForm = Object.assign({}, this.courseForm.value);

    this.moderatorService.createCourse(courseFromForm)
        .map((r) => r.json())
        .subscribe((responseObject) => {
          const { message } = responseObject;

          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/moderator');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }
}
