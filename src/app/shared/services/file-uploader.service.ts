import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { HttpRequesterService } from './http-requester.service';

const UPLOAD_FILE_NAME = 'uploads[]';
const UPLOAD_IMAGE_URL = 'http://localhost:3000/upload';

@Injectable()
export class FileUploaderService {

  constructor(private httpRequester: HttpRequesterService) { }

  public uploadFile(files: File[]): Observable<Response> {
    const formData = new FormData();
    formData.append(UPLOAD_FILE_NAME, files[0]);

    return this.httpRequester.postFormData(UPLOAD_IMAGE_URL, formData);
  }
}
