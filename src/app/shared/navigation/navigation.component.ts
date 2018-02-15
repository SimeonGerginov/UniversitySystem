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
  public isUserLogged: boolean;
  public isUserAdmin: boolean;
  public isUserStudent: boolean;
  public isUserModerator: boolean;

  public username: string;
  public profilePictureUrl: string;

  constructor(private userStorageService: UserStorageService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.isUserLogged = this.userStorageService.isUserLoggedIn();
    this.isUserAdmin = this.userStorageService.isUserAdmin();
    this.isUserModerator = this.userStorageService.isUserModerator();
    this.isUserStudent = this.userStorageService.isUserStudent();

    if (this.isUserLogged) {
      this.username = this.userStorageService.getLoggedUserUsername();
      this.profilePictureUrl = this.userStorageService.getLoggedUserProfilePicture();
    }
  }

  ngDoCheck(): void {
    this.isUserLogged = this.userStorageService.isUserLoggedIn();
    this.isUserAdmin = this.userStorageService.isUserAdmin();
    this.isUserModerator = this.userStorageService.isUserModerator();
    this.isUserStudent = this.userStorageService.isUserStudent();
    this.username = this.userStorageService.getLoggedUserUsername();
    this.profilePictureUrl = this.userStorageService.getLoggedUserProfilePicture();
  }

  logoutUser() {
    this.isUserLogged = false;
    this.isUserAdmin = false;
    this.isUserModerator = false;
    this.isUserStudent = false;
    this.userStorageService.logoutUser();
    this.notificationService.showSuccess('You are now logged out!');
    this.router.navigateByUrl('/home');
  }
}
