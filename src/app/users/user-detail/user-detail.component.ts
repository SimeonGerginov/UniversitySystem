import { Component, Input } from '@angular/core';

import { Student } from '../../shared/models/student.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input()
  public student: Student;

  constructor() { }
}
