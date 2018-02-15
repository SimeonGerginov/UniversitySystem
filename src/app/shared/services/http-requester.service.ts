import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const DEFAULT_CONTENT_TYPE = 'application/json';

@Injectable()
export class HttpRequesterService {

  constructor(private http: Http) { }

  private getRequestOptions(requestHeaders: any): RequestOptions {
    requestHeaders['Content-Type'] = DEFAULT_CONTENT_TYPE;
    const headers = new Headers(requestHeaders);

    return new RequestOptions({ headers });
  }

  get(url: string, requestHeaders: any): Observable<Response> {
    const requestOptions = this.getRequestOptions(requestHeaders);

    return this.http.get(url, requestOptions);
  }

  post(url: string, data: any, requestHeaders: any): Observable<Response> {
    const requestOptions = this.getRequestOptions(requestHeaders);

    return this.http.post(url, data, requestOptions);
  }

  put(url: string, data: any, requestHeaders: any): Observable<Response> {
    const body = JSON.stringify(data);
    const requestOptions = this.getRequestOptions(requestHeaders);

    console.log(body);
    console.log(data);

    return this.http.put(url, body, requestOptions);
  }

  delete(url: string, requestHeaders: any): Observable<Response> {
    const requestOptions = this.getRequestOptions(requestHeaders);

    return this.http.delete(url, requestHeaders);
  }

  postFormData(url: string, formData: FormData): Observable<Response> {
    return this.http.post(url, formData);
  }
}
