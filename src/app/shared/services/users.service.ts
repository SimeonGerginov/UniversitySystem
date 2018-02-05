import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpRequesterService } from './http-requester.service';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

const DOMAIN_URL = '/api';
const REGISTER_USER_URL = DOMAIN_URL + '/register';
const LOGIN_USER_URL = DOMAIN_URL + '/login';
const LOGOUT_USER_URL = DOMAIN_URL + '/logout';

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

  logoutUser(): Observable<Response> {
    return this.httpRequester.get(LOGOUT_USER_URL, {});
  }
}
