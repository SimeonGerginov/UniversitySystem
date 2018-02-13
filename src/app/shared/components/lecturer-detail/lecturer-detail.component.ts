import { Component, Input } from '@angular/core';
import { Lecturer } from '../../models/lecturer.model';

@Component({
  selector: 'app-lecturer-detail',
  templateUrl: './lecturer-detail.component.html',
  styleUrls: ['./lecturer-detail.component.css']
})
export class LecturerDetailComponent {
  @Input()
  public lecturer: Lecturer;

  constructor() { }
}
