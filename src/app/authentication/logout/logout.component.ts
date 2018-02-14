import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserStorageService } from '../../shared/services/user-storage.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private userStorageService: UserStorageService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.userStorageService.logoutUser();
    this.notificationService.showSuccess('You have logged out successfully');
    this.router.navigateByUrl('/');
  }

}
