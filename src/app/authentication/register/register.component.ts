import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { User } from '../../shared/models/user.model';

const EMAIL_PATTERN = '^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$';
const PASSWORD_PATTERN = '^[a-zA-Z0-9 ]{8,30}$';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public userForm: FormGroup;

  constructor(private userService: UsersService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = new User();
    this.createForm();
  }

  private createForm(): void {
    this.userForm = new FormGroup({
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

  onRegisterSubmit(): void {
    this.userService.registerUser(this.user)
        .map(r => r.json())
        .subscribe((responceObject) => {
          const { message } = responceObject;

          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/login');
        }, (err) => {
          const { errorMsg } = err;

          this.notificationService.showError(errorMsg);
        });
  }

}
