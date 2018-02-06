import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { UserStorageService } from '../services/user-storage.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, DoCheck {
  isUserLogged: boolean;
  username: string;
  profilePictureUrl: string;

  constructor(private userStorageService: UserStorageService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.isUserLogged = this.userStorageService.isUserLoggedIn();

    if (this.isUserLogged) {
      this.username = this.userStorageService.getLoggedUserUsername();
      this.profilePictureUrl = this.userStorageService.getLoggedUserProfilePicture();
    }
  }

  ngDoCheck(): void {
    this.isUserLogged = this.userStorageService.isUserLoggedIn();
    this.username = this.userStorageService.getLoggedUserUsername();
    this.profilePictureUrl = this.userStorageService.getLoggedUserProfilePicture();
  }

  logoutUser() {
    this.userStorageService.logoutUser();
    this.notificationService.showSuccess('You are now logged out!');
    this.router.navigateByUrl('/home');
  }

}
