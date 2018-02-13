import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { ModeratorService } from '../../shared/services/moderator.service';
import { NotificationService } from '../../shared/services/notification.service';

const EMAIL_PATTERN = '^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$';
const PASSWORD_PATTERN = '^[a-zA-Z0-9 ]{8,30}$';

@Component({
  selector: 'app-add-lecturer',
  templateUrl: './add-lecturer.component.html',
  styleUrls: ['./add-lecturer.component.css']
})
export class AddLecturerComponent implements OnInit {
  public lecturerForm: FormGroup;

  constructor(private router: Router,
              private notificationService: NotificationService,
              private moderatorService: ModeratorService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.lecturerForm = new FormGroup({
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
      password: new FormControl('', [ Validators.required, Validators.pattern(PASSWORD_PATTERN)])
    });
  }

  onLecturerCreationSubmit(): void {
    const lecturerFromForm = Object.assign({}, this.lecturerForm.value);

    this.moderatorService.createLecturer(lecturerFromForm)
        .map((r) => r.json())
        .subscribe((responseObject) => {
          const { message } = responseObject;

          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/moderator/lecturers');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }
}
