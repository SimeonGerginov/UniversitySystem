import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';

import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;

  constructor(private userService: UsersService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = new User();
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
