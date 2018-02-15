import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpRequesterService } from './http-requester.service';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

const DOMAIN_URL = 'http://localhost:3000/api';
const REGISTER_USER_URL = DOMAIN_URL + '/register';
const LOGIN_USER_URL = DOMAIN_URL + '/login';
const USER_INFO_URL = DOMAIN_URL + '/users/profile';
const UPDATE_USER_URL = DOMAIN_URL + '/users/update';
const ALL_USERS_URL = DOMAIN_URL + '/users';
const ALL_REQUIRED_COURSES_URL = DOMAIN_URL + '/courses/required';
const ALL_OPTIONAL_COURSES_URL = DOMAIN_URL + '/courses/optional';

@Injectable()
export class UsersService {

  constructor(private httpRequester: HttpRequesterService,
    private userStorageService: UserStorageService) { }

  isUserLoggedIn(): boolean {
    return this.userStorageService.isUserLoggedIn();
  }

  getHeaders(): Object {
    const token = this.userStorageService.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return headers;
  }

  getAllRequiredCourses(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(ALL_REQUIRED_COURSES_URL, headers);
  }

  getAllOptionalCourses(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(ALL_OPTIONAL_COURSES_URL, headers);
  }

  registerUser(user: User): Observable<Response> {
    return this.httpRequester.post(REGISTER_USER_URL, user, {});
  }

  loginUser(user: User): Observable<Response> {
    return this.httpRequester.post(LOGIN_USER_URL, user, {});
  }

  getAllUsers(): Observable<Response> {
    return this.httpRequester.get(ALL_USERS_URL, {});
  }

  getLoggedUserInfo(): Observable<Response> {
    const token = this.userStorageService.getLoggedUserToken();
    const url = USER_INFO_URL;
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return this.httpRequester.get(url, headers);
  }

  updateUserInfo(user: User): Observable<Response> {
    const token = this.userStorageService.getLoggedUserToken();
    const url = UPDATE_USER_URL;
    const headers = {
      token,
      'Content-Type': 'application/json',
    };

    return this.httpRequester.put(url, user, headers);
  }
}
