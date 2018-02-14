import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';

const USERNAME_PATTERN = /^[a-zA-Z0-9 ]{3,30}$/;
const FIRSTNAME_PATTERN = /^[a-zA-Z0-9 ]{3,18}$/;
const LASTNAME_PATTERN = /^[a-zA-Z0-9 ]{3,18}$/;
const EMAIL_PATTERN = /^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9 ]{8,30}$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;

  constructor(private userService: UsersService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [ Validators.required,
                       Validators.pattern(USERNAME_PATTERN)]),
      firstName: new FormControl('', [ Validators.required,
                        Validators.pattern(FIRSTNAME_PATTERN)]),
      lastName: new FormControl('', [ Validators.required,
                       Validators.pattern(LASTNAME_PATTERN)]),
      email: new FormControl('', [ Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl('', [ Validators.required, Validators.pattern(PASSWORD_PATTERN)])
    });
  }

  onRegisterSubmit(): void {
    const userFromForm = Object.assign({}, this.userForm.value);

    this.userService.registerUser(userFromForm)
        .map(r => r.json())
        .subscribe((responceObject) => {
          const { message } = responceObject;

          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/auth/login');
        }, (err) => {
          const { errorMessage } = err;

          this.notificationService.showError(errorMessage);
          this.router.navigateByUrl('/home');
        });
  }

}
