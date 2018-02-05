import { Component, OnInit, DoCheck } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

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
    this.router.navigateByUrl('/home');
  }

}
