import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

const USERNAME_COOKIE_NAME = 'username';
const TOKEN_COOKIE_NAME = 'auth-token';
const PROFILE_PICTURE_COOKIE_NAME = 'profile-pic';

const ADMIN_ROLE = 'Admin';
const MODERATOR_ROLE = 'Moderator';
const STUDENT_ROLE = 'Student';
const LECTURER_ROLE = 'Lecturer';

@Injectable()
export class UserStorageService {

  constructor(private cookieService: CookieService) { }

  isUserLoggedIn(): boolean {
    return this.cookieService.check(TOKEN_COOKIE_NAME);
  }

  isUserAdmin(): boolean {
    return this.cookieService.check(ADMIN_ROLE);
  }

  isUserModerator(): boolean {
    return this.cookieService.check(MODERATOR_ROLE);
  }

  isUserStudent(): boolean {
    return this.cookieService.check(STUDENT_ROLE);
  }

  setUserRole(role: string): void {
    if (role === ADMIN_ROLE) {
      this.cookieService.set(ADMIN_ROLE, role);
    } else if (role === MODERATOR_ROLE) {
      this.cookieService.set(MODERATOR_ROLE, role);
    } else if (role === STUDENT_ROLE) {
      this.cookieService.set(STUDENT_ROLE, role);
    } else {
      this.cookieService.set(LECTURER_ROLE, role);
    }
  }

  setUserInfo(user: User): void {
    this.cookieService.set(USERNAME_COOKIE_NAME, user.username);
    this.cookieService.set(PROFILE_PICTURE_COOKIE_NAME, user.profilePictureUrl);
  }

  loginUser(username: string, authToken: string, profilePicture: string, role: string): void {
    this.cookieService.set(USERNAME_COOKIE_NAME, username);
    this.cookieService.set(TOKEN_COOKIE_NAME, authToken);
    this.cookieService.set(PROFILE_PICTURE_COOKIE_NAME, profilePicture);
    this.setUserRole(role);
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

  getUserRole(): string {
    if (this.isUserAdmin()) {
      return this.cookieService.get(ADMIN_ROLE);
    } else if (this.isUserModerator()) {
      return this.cookieService.get(MODERATOR_ROLE);
    } else if (this.isUserStudent()) {
      return this.cookieService.get(STUDENT_ROLE);
    } else {
      return this.cookieService.get(LECTURER_ROLE);
    }
  }
}
