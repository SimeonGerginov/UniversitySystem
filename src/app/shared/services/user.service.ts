import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public login(user: User): Observable<any> {
    return this.http
        .post(`${environment.apiEndpoint}/login`, user)
        .map((res) => {
             localStorage.setItem('user_name', res.json().username);
             localStorage.setItem('user_email', res.json().email);
             localStorage.setItem('user_role', res.json().roles[0]);
        });
  }

  public register(user: User) {
    return this.http
        .post(`${environment.apiEndpoint}/register`, user)
        .map((res) => res.json());
  }

  public logout(): void {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
  }
}
