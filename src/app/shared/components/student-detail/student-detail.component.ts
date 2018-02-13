import { Component, Input } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {
  @Input()
  public student: Student;

  constructor() { }
}
