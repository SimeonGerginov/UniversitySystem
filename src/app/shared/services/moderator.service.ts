import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpRequesterService } from './http-requester.service';
import { UserStorageService } from './user-storage.service';

const DOMAIN_URL = 'http://localhost:3000/api/moderator/';

const GET_ALL_STUDENTS_URL = DOMAIN_URL + 'students';
const GET_ALL_REQUIRED_COURSES_URL = DOMAIN_URL + 'courses/required';
const GET_ALL_OPTIONAL_COURSES_URL = DOMAIN_URL + 'courses/optional';
const GET_ALL_LECTURERS_URL = DOMAIN_URL + 'lecturers';

const CREATE_STUDENT_URL = DOMAIN_URL + 'students';
const CREATE_LECTURER_URL = DOMAIN_URL + 'lecturers';
const CREATE_COURSE__URL = DOMAIN_URL + 'courses';

@Injectable()
export class ModeratorService {

  constructor(private httpRequester: HttpRequesterService,
              private userStorage: UserStorageService) { }

  isUserModerator(): boolean {
    return this.userStorage.isUserModerator();
  }

  getHeaders(): Object {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return headers;
  }

  getAllStudents(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(GET_ALL_STUDENTS_URL, headers);
  }

  getAllRequiredCourses(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(GET_ALL_REQUIRED_COURSES_URL, headers);
  }

  getAllOptionalCourses(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(GET_ALL_OPTIONAL_COURSES_URL, headers);
  }

  getAllLecturers(): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.get(GET_ALL_LECTURERS_URL, headers);
  }

  createStudent(student: any): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.post(CREATE_STUDENT_URL, student, headers);
  }

  createLecturer(lecturer: any): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.post(CREATE_LECTURER_URL, lecturer, headers);
  }

  createCourse(course: any): Observable<Response> {
    const headers = this.getHeaders();

    return this.httpRequester.post(CREATE_COURSE__URL, course, headers);
  }

  addStudentToCourse(courseId: string, studentId: string): Observable<Response> {
    const headers = this.getHeaders;
    const ADD_STUDENT_TO_COURSE_URL = DOMAIN_URL + `courses/${courseId}/students/${studentId}`;

    return this.httpRequester.put(ADD_STUDENT_TO_COURSE_URL, {}, headers);
  }

  addLecturerToCourse(courseId: string, lecturerId: string): Observable<Response> {
    const headers = this.getHeaders();
    const ADD_LECTURER_TO_COURSE_URL = DOMAIN_URL + `courses/${courseId}/lecturers/${lecturerId}`;

    return this.httpRequester.put(ADD_LECTURER_TO_COURSE_URL, {}, headers);
  }

  addMarkToStudentForCourse(courseId: string, studentId: string, mark: number): Observable<Response> {
    const headers = this.getHeaders();
    const ADD_MARK_TO_STUDENT_FOR_COURSE_URL = DOMAIN_URL + `courses/${courseId}/students/${studentId}/marks`;

    return this.httpRequester.put(ADD_MARK_TO_STUDENT_FOR_COURSE_URL, mark, headers);
  }
}
