import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpRequesterService } from './http-requester.service';
import { UserStorageService } from './user-storage.service';
import { User } from '../models/user.model';

const DOMAIN_URL = 'http://localhost:3000/api/admin';
const ALL_MODERATORS_URL = DOMAIN_URL + '/moderators';
const CREATE_MODERATOR_URL = DOMAIN_URL + '/moderators';
const ADMIN_ROLE = 'Admin';

@Injectable()
export class AdminService {

  constructor(private httpRequester: HttpRequesterService,
              private userStorage: UserStorageService) { }

  isUserAdmin(): boolean {
    const role = this.userStorage.getLoggedUserRole();

    if (role === ADMIN_ROLE) {
      return true;
    } else {
      return false;
    }
  }

  getAllModerators(): Observable<Response> {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return this.httpRequester.get(ALL_MODERATORS_URL, headers);
  }

  createModerator(moderator: any): Observable<Response> {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return this.httpRequester.post(CREATE_MODERATOR_URL, moderator, headers);
  }

  getModerator(id: string): Observable<Response> {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    const GET_MODERATOR_URL = DOMAIN_URL + `/moderators/${id}`;

    return this.httpRequester.get(GET_MODERATOR_URL, headers);
  }

  updateModerator(id: string, moderator: User): Observable<Response> {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    const UPDATE_MODERATOR_URL = DOMAIN_URL + `/moderators/${id}`;

    return this.httpRequester.put(UPDATE_MODERATOR_URL, moderator, headers);
  }

}
