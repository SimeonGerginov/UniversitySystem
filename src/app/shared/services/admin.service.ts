import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpRequesterService } from './http-requester.service';
import { UserStorageService } from './user-storage.service';
import { User } from '../models/user.model';

const DOMAIN_URL = 'http://localhost:3000/api/admin';
const ALL_MODERATORS_URL = DOMAIN_URL + '/moderators';
const CREATE_MODERATOR_URL = DOMAIN_URL + '/moderators';

@Injectable()
export class AdminService {

  constructor(private httpRequester: HttpRequesterService,
              private userStorage: UserStorageService) { }

  isUserAdmin(): boolean {
    return this.userStorage.isUserAdmin();
  }

  getHeaders(): Object {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return headers;
  }

  getAllModerators(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(ALL_MODERATORS_URL, headers);
  }

  createModerator(moderator: any): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.post(CREATE_MODERATOR_URL, moderator, headers);
  }

  getModerator(id: string): Observable<Response> {
    const headers = this.getHeaders();
    const GET_MODERATOR_URL = DOMAIN_URL + `/moderators/${id}`;

    return this.httpRequester.get(GET_MODERATOR_URL, headers);
  }

  updateModerator(id: string, moderator: User): Observable<Response> {
    const headers = this.getHeaders();
    const UPDATE_MODERATOR_URL = DOMAIN_URL + `/moderators/${id}`;

    return this.httpRequester.put(UPDATE_MODERATOR_URL, moderator, headers);
  }

  deleteModerator(id: string): Observable<Response> {
    const headers = this.getHeaders();
    const DELETE_MODERATOR_URL = DOMAIN_URL + `/moderators/${id}`;

    return this.httpRequester.delete(DELETE_MODERATOR_URL, headers);
  }
}
