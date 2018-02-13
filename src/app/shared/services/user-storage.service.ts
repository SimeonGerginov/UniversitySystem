import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

const USERNAME_COOKIE_NAME = 'username';
const TOKEN_COOKIE_NAME = 'auth-token';
const PROFILE_PICTURE_COOKIE_NAME = 'profile-pic';
const USER_ROLE = 'user-role';
const ADMIN_ROLE = 'Admin';
const MODERATOR_ROLE = 'Moderator';

@Injectable()
export class UserStorageService {

  constructor(private cookieService: CookieService) { }

  isUserLoggedIn(): boolean {
    return this.cookieService.check(TOKEN_COOKIE_NAME);
  }

  isUserAdmin(): boolean {
    return this.cookieService.get(USER_ROLE) === ADMIN_ROLE;
  }

  isUserModerator(): boolean {
    return this.cookieService.get(USER_ROLE) === MODERATOR_ROLE;
  }

  loginUser(username: string, authToken: string, profilePicture: string, role: string): void {
    this.cookieService.set(USERNAME_COOKIE_NAME, username);
    this.cookieService.set(TOKEN_COOKIE_NAME, authToken);
    this.cookieService.set(PROFILE_PICTURE_COOKIE_NAME, profilePicture);
    this.cookieService.set(USER_ROLE, role);
  }

  logoutUser(): void {
    this.cookieService.deleteAll();
  }

  getLoggedUserProfilePicture(): string {
    return this.cookieService.get(PROFILE_PICTURE_COOKIE_NAME);
  }

  getLoggedUserUsername(): string {
    return this.cookieService.get(USERNAME_COOKIE_NAME);
  }

  getLoggedUserToken(): string {
    return this.cookieService.get(TOKEN_COOKIE_NAME);
  }

  setUserInfo(user: User): void {
    this.cookieService.set(USERNAME_COOKIE_NAME, user.username);
    this.cookieService.set(PROFILE_PICTURE_COOKIE_NAME, user.profilePictureUrl);
  }
}
