import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { User } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserStorageService } from '../../shared/services/user-storage.service';

const EMAIL_PATTERN = '^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$';
const PASSWORD_PATTERN = '^[a-zA-Z0-9 ]{8,30}$';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public userForm: FormGroup;

  constructor(private userService: UsersService,
              private userStorageService: UserStorageService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = new User();
    this.createForm();
  }

  private createForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl('', [ Validators.required, Validators.pattern(PASSWORD_PATTERN)])
    });
  }

  onLoginSubmit(): void {
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;

    this.userService.loginUser(this.user)
        .map((r) => r.json())
        .subscribe((responce: any) => {
          const { username, token, profilePicture, message } = responce;

          this.userStorageService.loginUser(username, token, profilePicture);
          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/');
        },
        (err) => {
           const { message } = err;

           this.notificationService.showError(message);
        });
  }
}
