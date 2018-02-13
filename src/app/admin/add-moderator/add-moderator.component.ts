import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { AdminService } from '../../shared/services/admin.service';
import { NotificationService } from '../../shared/services/notification.service';

const EMAIL_PATTERN = '^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$';
const PASSWORD_PATTERN = '^[a-zA-Z0-9 ]{8,30}$';

@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css']
})
export class AddModeratorComponent implements OnInit {
  public moderatorForm: FormGroup;

  constructor(private router: Router,
              private adminService: AdminService,
              private notificationService: NotificationService) { }

  ngOnInit() {
     this.createForm();
  }

  private createForm(): void {
     this.moderatorForm = new FormGroup({
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

  onModeratorCreationSubmit(): void {
    const moderatorFromForm = Object.assign({}, this.moderatorForm.value);

    this.adminService.createModerator(moderatorFromForm)
        .map(r => r.json())
        .subscribe((responceObject) => {
          const { message } = responceObject;

          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/admin/all');
        }, (err) => {
          const { errorMsg } = err;

          this.notificationService.showError(errorMsg);
        });
  }

}
