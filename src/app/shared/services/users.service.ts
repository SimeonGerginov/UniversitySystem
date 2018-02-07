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

@Injectable()
export class UsersService {

  constructor(private httpRequester: HttpRequesterService,
    private userStorageService: UserStorageService) { }

  isUserLoggedIn(): boolean {
    return this.userStorageService.isUserLoggedIn();
  }

  registerUser(user: User): Observable<Response> {
    return this.httpRequester.post(REGISTER_USER_URL, user, {});
  }

  loginUser(user: User): Observable<Response> {
    return this.httpRequester.post(LOGIN_USER_URL, user, {});
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
