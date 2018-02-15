import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserStorageService } from './user-storage.service';
import { HttpRequesterService } from './http-requester.service';

const DOMAIN_URL = 'http://localhost:3000/api/students/';

@Injectable()
export class StudentService {

  constructor(private httpRequester: HttpRequesterService,
              private userStorage: UserStorageService) { }

  getHeaders(): Object {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return headers;
  }

  addHomeworkToCourse(courseId: string, studentUsername: string, homework: any): Observable<Response> {
    const headers = this.getHeaders();
    const ADD_HOMEWORK_TO_COURSE_URL = DOMAIN_URL + `${studentUsername}/${courseId}`;

    return this.httpRequester.post(ADD_HOMEWORK_TO_COURSE_URL, homework, headers);
  }

  addCommentToCourse(courseId: string, commentToAdd: any): Observable<Response> {
    const headers = this.getHeaders();
    const ADD_COMMENT_TO_COURSE_URL = DOMAIN_URL + `${courseId}`;

    const body = {
      comment: commentToAdd
    };

    return this.httpRequester.put(ADD_COMMENT_TO_COURSE_URL, body, headers);
  }
}
