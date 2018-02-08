import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input()
  public user: User;

  constructor() { }
}
